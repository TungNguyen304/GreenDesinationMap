import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import criteriaApi from '../../../api/criteriaApi'
import style from './providecriteria.module.scss'
import classNames from 'classnames/bind';
const cx = classNames.bind(style)

function ProvideCriteria() {
    const [criteriaList, setCriteriaList] = useState([])
    const service = JSON.parse(localStorage.getItem('placeTemporary'))


    useEffect(() => {
        const list = document.querySelectorAll(`.${style.wrap_list} div`)
        list.forEach((item) => {
            item.onclick = () => {
                const criteria = item.querySelector('input')
                if(criteria)
                    criteria.checked = !criteria.checked
            }
        })
    })

    useEffect(() => {
        (async () => {
            const data = await criteriaApi.getAll()
            setCriteriaList(data.data)
        })()
    }, [])

    function handleDispatchValue(event) {
        const inputList = [...document.querySelectorAll(`.${style.wrap_list} div input:checked`)]
        const criteriaTickList = inputList.map((item) => {
            return item.value
        })
        const currdentData = JSON.parse(localStorage.getItem('placeTemporary'))
        localStorage.setItem('placeTemporary', JSON.stringify({
            ...currdentData,
            criteriaList: [...criteriaTickList]
        }))
    }

    useEffect(() => {
        if(service.criteriaList) {
            const inputList = [...document.querySelectorAll(`.${style.wrap_list} div input`)]
            inputList.forEach((item) => {
                if(service.criteriaList.includes(item.value)) {
                    item.checked = true
                }
            })
        }
    })

    return (<div>
        <div className={`flex h-[100vh] relative`}>
            <div style={{ "backgroundImage": "linear-gradient(to top, #441EA5, #CE247A)" }} className="w-[50%] flex justify-center items-center px-10">
                <div className="text-6xl font-bold text-white italic">Tiếp theo, hãy chọn các tiêu chí <span className="text-green-600 underline">xanh</span> mà bạn muốn đăng ký trên ứng dụng của chúng thôi</div>
            </div>
            <div className="w-[50%] h-full flex flex-col justify-center items-center px-[120px] relative">
                <div className="w-full">
                    <div className="text-2xl italic font-medium mb-3">Bấm chọn vào các tiêu chí bạn muốn đăng ký</div>
                    <div className={`${cx('wrap_list')} h-[65vh] overflow-y-scroll px-3 pt-3`}>
                        {criteriaList.map((item) => {
                            if(item.role === 1) {
                                return (<div key={item.id} className="flex items-center px-3 py-4 border-2 border-solid border-normal rounded-lg mb-3 cursor-pointer hover:border-black active:scale-[0.98]">
                                    <img className="w-[40px] h-[40px] rounded-lg" src={require(`../../../upload/criteria/${item.image}`)} alt="" />
                                    <div className="flex-1 ml-3 text-lg font-medium italic">{item.name}</div>
                                    <input value={item.name} className="w-[20px] h-[20px] pointer-events-none" type="checkbox" />
                                </div>)
                            }
                            else return <></>
                        })}    
                    </div>
                </div>
            </div>

            <Link onClick={() => {localStorage.removeItem('placeTemporary')}} to='/host' className="z-10 fixed top-4 right-4 text-sm italic bg-slate-50 px-3 py-1 rounded-lg cursor-pointer hover:brightness-95 active:scale-95 select-none">Thoát</Link>
            <Link to='/host/registerservice/providetitle' style={{ "backgroundImage": "linear-gradient(to right, #07D5DF, #7F6DEF, #F408FE)" }} className="z-10 fixed bottom-8 left-[55%] italic text-white px-6 py-2 font-semibold rounded-lg cursor-pointer hover:brightness-95 active:scale-95 select-none">Quay lại</Link>
            <Link onClick={(e) => handleDispatchValue(e)} to='/host/registerservice/preview' style={{ "backgroundImage": "linear-gradient(to right, #07D5DF, #7F6DEF, #F408FE)" }} className="cursor-pointer z-10 fixed bottom-8 right-8 italic text-white px-6 py-2 font-semibold rounded-lg hover:brightness-95 active:scale-95 select-none">Lưu và xem lại địa điểm của bạn</Link>
        </div>
    </div>);
}

export default ProvideCriteria;