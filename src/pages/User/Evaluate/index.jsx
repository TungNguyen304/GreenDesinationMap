import Header from "../../../components/common/Header";
import criteriaApi from "../../../api/criteriaApi";
import { useEffect } from "react";
import { Fragment } from "react";
import { useState } from "react";
import { useValueContext } from "../../../hook";
import { Link, useNavigate } from "react-router-dom";
import ratingApi from "../../../api/ratingApi";
import { useSelector } from "react-redux";
import { $CombinedState } from "redux";


function Evaluate() {
    const [criteriaList, setCriteriaList] = useState([])
    const [rating, setRating] = useState([])
    const value = useValueContext()
    const place = JSON.parse(localStorage.getItem('service'))
    const user = useSelector((state) => state.accountReducer.user)
    const navigate = useNavigate()

    const placeTypeId = {
        "cafe": 1,
        "restaurant": 2,
        "hotel": 3,
    }

    useEffect(() => {
        (async () => {
            value.loadRef() && value.loadRef().classList.remove("hidden")
            const data = await criteriaApi.getByPlaceTypeId(placeTypeId[place.type])
            const data1 = await ratingApi.getRatingByUserid(place.id, user.id)
            setCriteriaList(data.data)
            setRating(data1.data)
        })()
    }, [])

    useEffect(() => {
        (async () => {
            const inputList = [...document.querySelectorAll(".rating-list input")]
            if (inputList.length > 0) {
                value.loadRef() && value.loadRef().classList.add("hidden")
            }
            inputList && inputList.forEach((item) => {
                rating && rating.forEach((item1) => {
                    if (Number(item.dataset.ratingid) === item1.criteriasModel.criteriaid) {
                        item.checked = true
                    }
                })
            })
        })()
    }, [criteriaList, rating])

    function handlePostRating() {
        value.loadRef().classList.remove("hidden")
        const inputList = document.querySelectorAll(".rating-list input:checked")
        const data = [...inputList].map((item) => ({
            "criteriavalue": true,
            "criteriasModel": {
                "criteriaid": item.dataset.ratingid
            },
            "placeModel": {
                "placeid": place.id
            },
            "userModel": {
                "userid": user.id
            }
        }))
        if(rating.length > 0) {
            ratingApi.updateRating(data)    
            .then(() => {
                navigate(`/room/${place.id}`)
                alert("Rating success!")
                value.loadRef().classList.add("hidden")
            })
            .catch(() => {
                navigate(`/room/${place.id}`)
                alert("Rating failed!")
                value.loadRef().classList.add("hidden")
            })
        } else {
            ratingApi.postRating(data)
            .then(() => {
                navigate(`/room/${place.id}`)
                alert("Rating success!")
                value.loadRef().classList.add("hidden")
            })
            .catch(() => {
                navigate(`/room/${place.id}`)
                alert("Rating failed!")
                value.loadRef().classList.add("hidden")
            })
        }
            

    }

    return (<div className="flex flex-col">
        <Header />
        <div className="bg-[#E2EEE0] flex-1">
            <div style={{ marginTop: "calc(var(--height_header))" }} className="w-[50%] mx-auto pt-3">
                <div className="mb-3">
                    <img className="rounded-lg" src={require('../../../assets/images/evaluateBanner.png')} alt="" />
                </div>
                <div style={{ border: "1px solid #dadce0" }} className="rounded-lg overflow-hidden bg-white mb-3">
                    <div className="h-2 bg-green-600"></div>
                    <div className="px-5 py-5">
                        <div className="text-3xl font-semibold">Cuộc khảo sát về mức độ hài lòng của khách hàng về <Link to='/room' className="text-green-600 italic underline cursor-pointer">{place.name}</Link></div>
                        <div className="mt-3 text-sm italic">Vui lòng tham gia cuộc khảo sát này để giúp Green Destination Map cải thiện mức độ hài lòng của quý khách hàng về địa điểm này, trân trọng phản hồi của bạn</div>
                    </div>
                </div>
                <div style={{ border: "1px solid #dadce0" }} className="p-3 bg-white rounded-lg overflow-hidden">
                    <div className="inline-block p-3 border-b-[3px] text-xl font-medium border-solid border-[#ccc]">
                        Các tiêu chí xanh mà địa điểm này đạt được?
                    </div>
                    <div className="p-3">
                        {
                            criteriaList.map((item) => {
                                if (item.actor) {
                                    return (<div key={item.id} className="flex items-center my-8">
                                        <div className="flex items-center rating-list">
                                            <input data-ratingid={item.id} className="w-6 h-6 mr-7 shrink-0" type="checkbox" id={item.id} value={item.name} />
                                            <label className="font-medium" htmlFor={item.id}>{item.name}</label>
                                        </div>
                                    </div>)
                                }
                                else return <Fragment key={item.id}></Fragment>
                            })
                        }
                    </div>
                </div>

                <div className="fixed top-[50%] right-[10%]">
                    <button onClick={handlePostRating} style={{ "backgroundImage": "linear-gradient(to right, #07D5DF, #7F6DEF, #F408FE)" }} className=' text-white py-3 px-10 flex items-center mx-auto rounded-full hover:opacity-90 active:scale-[0.98]'>
                        <span className='font-semibold italic'>Submit</span>
                    </button>
                </div>
            </div>
        </div>
    </div>);
}

export default Evaluate;