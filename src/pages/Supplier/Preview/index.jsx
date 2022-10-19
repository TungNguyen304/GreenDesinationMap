import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ServiceItem from '../../../components/Home/Service/ServiceItem'
import placeFirebase from "../../../firebase/place";

function Preview() {
    const currdentData = JSON.parse(localStorage.getItem('placeTemporary'))
    const accountSupplier = JSON.parse(localStorage.getItem('accountSupplier'))
    const [imageList, setImageList] = useState([])
    
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('placeTemporary'))
        setImageList([...data.imageList])
    }, [])

    function test(event) {
        // currdentData.imageList.forEach(async (item) => {
        //     placeFirebase.push(item.name, item.file)
        // })
    }

    return (<div>
        <div className={`flex h-[100vh] relative`}>
            <div style={{ "backgroundImage": "linear-gradient(to top, #441EA5, #CE247A)" }} className="w-[50%] flex justify-center items-center px-10">
                <div className="text-6xl font-bold text-white italic">Bạn có thể xem lại toàn bộ địa điểm</div>
            </div>
            <div className="w-[50%] h-full flex flex-col justify-center items-center px-[210px] relative">
                <div className="w-full">
                    {currdentData && <ServiceItem typeService={currdentData.type} name={currdentData.name} phone={accountSupplier.phonenumber} star={3} imageList={imageList} previewPage={true} address={currdentData.road + ', ' + currdentData.ward + ', ' + currdentData.district + ', ' + currdentData.city} />}
                </div>
            </div>

            <Link onClick={() => { localStorage.removeItem('placeTemporary') }} to='/host' className="z-10 fixed top-4 right-4 text-sm italic bg-slate-50 px-3 py-1 rounded-lg cursor-pointer hover:brightness-95 active:scale-95 select-none">Thoát</Link>
            <Link to='/host/registerservice/providecriteria' style={{ "backgroundImage": "linear-gradient(to right, #07D5DF, #7F6DEF, #F408FE)" }} className="z-10 fixed bottom-8 left-[55%] italic text-white px-6 py-2 font-semibold rounded-lg cursor-pointer hover:brightness-95 active:scale-95 select-none">Quay lại</Link>
            <Link onClick={(e) => { test(e) }} to='/host/management' style={{ "backgroundImage": "linear-gradient(to right, #07D5DF, #7F6DEF, #F408FE)" }} className="cursor-pointer z-10 fixed bottom-8 right-8 italic text-white px-6 py-2 font-semibold rounded-lg hover:brightness-95 active:scale-95 select-none">Đăng địa điểm và chờ xét duyệt</Link>
        </div>
    </div>);
}

export default Preview;