import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ServiceItem from '../../../components/Home/Service/ServiceItem'
import placeFirebase from "../../../firebase/place";
import serviceApi from "../../../api/serviceApi";
import BigLoader from "../../../components/common/BigLoader";
import { useRef } from "react";

function Preview() {
    const navigate = useNavigate()
    const currdentData = JSON.parse(sessionStorage.getItem('placeTemporary'))
    const accountSupplier = useSelector(state => state.accountReducer).supplier
    const loaderRef = useRef()
    const state = sessionStorage.getItem("statusUpdate")
    const [imageList, setImageList] = useState([])
    const typeId = {
        "cafe": 1,
        "restaurant": 2,
        "hotel": 3,
    }

    useEffect(() => {
        const data = JSON.parse(sessionStorage.getItem('placeTemporary'))
        setImageList([...data.imageList])
    }, [])

    async function handlePostService(event) {
        event.preventDefault()
        loaderRef.current.classList.remove('hidden')

        // Check status update is yes or no
        if (state) {
            const listNew = currdentData.imageList.filter((item) => {
                return item.key
            })
            const listKeyNew = listNew.map((item) => {
                return item.key
            })
            currdentData.originImage.forEach((item) => {
                if (!listKeyNew.includes(item)) {
                    placeFirebase.delete(item)
                }
            })
        }

        const imgListUrl = await currdentData.imageList.map(async (item, index) => {
            if (!item.key) {
                const name = await placeFirebase.push(item.name, item.file)
                const url = await placeFirebase.get(name)
                return {
                    "imagekey": name,
                    "imagename": url
                }
            } else {
                return {
                    "imagekey": item.key,
                    "imagename": item.file
                }
            }
        })
        const ratingsCollection = currdentData.criteriaList.map((item) => {
            return {
                "criteriavalue": true,
                "criteriasModel": {
                    "criteriaid": item.id,
                },
                "useridfr": {
                    "userid": accountSupplier.id
                }
            }
        })

        Promise.all(imgListUrl).then((imagesCollection) => {
            const data = {
                "startday": state ? currdentData.startday.split("/").reverse().join("-") : new Date().toISOString().slice(0, 10),
                "mapid": currdentData.mapid,
                "status": false,
                "placename": currdentData.name,
                "lat": currdentData.lat,
                "lon": currdentData.lon,
                "country": "Việt Nam",
                "city": currdentData.city ? currdentData.city : "",
                "district": currdentData.district ? currdentData.district : "",
                "ward": currdentData.ward ? currdentData.ward : "",
                "description": currdentData.description,
                "star": 3,
                "road": currdentData.road ? currdentData.road : "",
                "phone": accountSupplier.phonenumber,
                "placetypeid": {
                    "placetypeid": typeId[currdentData.type]
                },
                "userid": {
                    "userid": accountSupplier.id
                },
                "imagesCollection": imagesCollection,
                "ratingsCollection": ratingsCollection
            }
            Object.keys(data).forEach((item) => {
                if(data[item] === "") {
                    delete data[item]
                }
            })
            if(state) {
                data.placeid = currdentData.id
                console.log(data);
                serviceApi.updateService(data)
                .then((res) => {
                    sessionStorage.removeItem('placeTemporary')
                    sessionStorage.removeItem('statusUpdate')
                    sessionStorage.removeItem('criteriaList')
                    navigate("/host/management")
                    alert("Update Success!")
                })
                .catch((err) => {
                    sessionStorage.removeItem('placeTemporary')
                    sessionStorage.removeItem('statusUpdate')
                    sessionStorage.removeItem('criteriaList')
                    navigate("/host/management")
                    alert("Fail!")
                })
            } else {
                serviceApi.addService(data)
                .then((res) => {
                    sessionStorage.removeItem('placeTemporary')
                    sessionStorage.removeItem('criteriaList')
                    navigate("/host/management")
                    alert("Post Success!")
                })
                .catch((err) => {
                    sessionStorage.removeItem('placeTemporary')
                    navigate("/host/management")
                    alert("Fail!")
                })
            }
                
        })

        
    }

    return (<div>
        <div className={`flex h-[100vh] relative`}>
            <div style={{ "backgroundImage": "linear-gradient(to top, #441EA5, #CE247A)" }} className="w-[50%] max966:hidden flex justify-center items-center px-10">
                <div className="text-6xl font-bold text-white italic">Bạn có thể xem lại toàn bộ địa điểm</div>
            </div>
            <div className="w-[50%] max966:w-full h-full flex flex-col justify-center items-center lg:px-[100px] px-[210px] max1380:px-[120px] max477:px-[20px] relative">
                <div className="w-full flex justify-center">
                    {currdentData && <ServiceItem typeService={currdentData.type} name={currdentData.name} phone={accountSupplier.phonenumber} star={3} imageListTemp={imageList} previewPage={true} address={currdentData.road + ', ' + currdentData.ward + ', ' + currdentData.district + ', ' + currdentData.city} />}
                </div>
            </div>

            <Link onClick={() => { sessionStorage.removeItem('placeTemporary') }} to='/host' className="z-10 fixed top-4 right-4 text-sm italic bg-slate-50 px-3 py-1 rounded-lg cursor-pointer hover:brightness-95 active:scale-95 select-none">Thoát</Link>
            <Link to='/host/registerservice/providecriteria' style={{ "backgroundImage": "linear-gradient(to right, #07D5DF, #7F6DEF, #F408FE)" }} className="z-10 fixed bottom-8 max966:bottom-14 left-[55%] max966:left-[50%] max966:translate-x-[-50%] ssm640:w-[90%] italic text-white px-6 py-2 font-semibold rounded-lg cursor-pointer hover:brightness-95 active:scale-95 select-none">Quay lại</Link>
            <div onClick={(e) => { handlePostService(e) }} style={{ "backgroundImage": "linear-gradient(to right, #07D5DF, #7F6DEF, #F408FE)" }} className="bg-[#DDDDDD] z-10 fixed bottom-8 max966:bottom-2 right-8 max966:left-[50%] whitespace-nowrap max966:translate-x-[-50%] italic ssm640:w-[90%] ssm640:text-start text-center text-white px-6 py-2 font-semibold rounded-lg cursor-pointer hover:brightness-95 active:scale-95 select-none">{state ? "Cập nhật địa điểm và chờ xét duyệt" : "Đăng địa điểm và chờ xét duyệt"}</div>
        </div>
        <div ref={loaderRef} className="hidden">
            <BigLoader />
        </div>
    </div>);
}

export default Preview;