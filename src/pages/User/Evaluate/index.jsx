import Header from "../../../components/common/Header";
import criteriaApi from "../../../api/criteriaApi";
import { useEffect } from "react";
import { useState } from "react";
import serviceApi from "../../../api/serviceApi";
import { Link } from "react-router-dom";


function Evaluate() {
    const id = window.location.pathname.replace('/evaluate/', '')
    const [criteriaList, setCriteriaList] = useState([])
    const [place, setPlace] = useState([])

    useEffect(() => {
        (async() => {
            const data = await criteriaApi.getAll()
            setCriteriaList(data.data)
        })()
    }, [])

    useEffect(() => {
        (async() => {
            const data = await serviceApi.get(id)
            setPlace(data.data)
        })()
    }, [])

    return ( <div>
        <Header/>
        <div className="bg-[#E2EEE0]">
            <div style={{marginTop: "calc(var(--height_header))"}} className="w-[50%] mx-auto pt-3">
                <div className="mb-3">
                    <img className="rounded-lg" src={require('../../../assets/images/evaluateBanner.png')} alt="" />
                </div>
                <div style={{border: "1px solid #dadce0"}} className="rounded-lg overflow-hidden bg-white mb-3">
                    <div className="h-2 bg-green-600"></div>
                    <div className="px-5 py-5">
                        <div className="text-3xl font-semibold">Cuộc khảo sát về mức độ hài lòng của khách hàng về <Link to='/room' className="text-green-600 italic underline cursor-pointer">{place.name}</Link></div>
                        <div className="mt-3 text-sm italic">Vui lòng tham gia cuộc khảo sát này để giúp Green Destination Map cải thiện mức độ hài lòng của quý khách hàng về địa điểm này, trân trọng phản hồi của bạn</div>
                    </div>
                </div>
                <div style={{border: "1px solid #dadce0"}} className="p-3 bg-white rounded-lg overflow-hidden">
                    <div className="inline-block p-3 border-b-[3px] text-xl font-medium border-solid border-[#ccc]">
                        Các tiêu chí xanh mà địa điểm này đạt được?
                    </div>
                    <div className="p-3">
                        {
                            criteriaList.map((item) => {
                                return (<div key={item.id} className="flex items-center my-8">
                                    <div className="w-[65px] h-[65px] mr-10 border border-solid border-green-600">
                                        <img className="w-full h-full" src={require(`../../../upload/criteria/${item.image}`)} alt="" />
                                    </div>
                                    <div className="flex items-center">
                                        <input className="w-6 h-6 mr-7" type="checkbox" id={item.id} value={item.name}/>
                                        <label className="font-medium" htmlFor={item.id}>{item.name}</label>
                                    </div>
                                </div>)
                            })
                        }
                    </div>
                </div>

                <div className="fixed top-[50%] right-[10%]">
                    <button style={{"backgroundImage": "linear-gradient(to right, #07D5DF, #7F6DEF, #F408FE)"}} className=' text-white py-3 px-10 flex items-center mx-auto rounded-full hover:opacity-90 active:scale-[0.98]'>
                        <span className='font-semibold italic'>Submit</span>
                    </button>
                </div>
            </div>
        </div>
    </div> );
}

export default Evaluate;