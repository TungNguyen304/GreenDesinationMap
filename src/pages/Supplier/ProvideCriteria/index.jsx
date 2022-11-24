import { useEffect, useRef } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import criteriaApi from '../../../api/criteriaApi'
import style from './providecriteria.module.scss'
import classNames from 'classnames/bind';
const cx = classNames.bind(style)

function ProvideCriteria() {
    
    const nextRef = useRef()
    const service = JSON.parse(sessionStorage.getItem('placeTemporary'))
    const accountSupplier = useSelector(state => state.accountReducer).supplier
    const criteriaList = JSON.parse(sessionStorage.getItem('criteriaList'))


    useEffect(() => {
        const list = document.querySelectorAll(`.${style.wrap_list} div`)
        list.forEach((item) => {
            item.onclick = () => {
                const criteria = item.querySelector('input')
                if (criteria) {
                    criteria.checked = !criteria.checked
                    handleCountTick()
                }
            }
        })
    })

    

    function handleCountTick() {
        const inputList = [...document.querySelectorAll(`.${style.wrap_list} div input:checked`)]
        if (inputList && criteriaList && Math.round((10 * inputList.length) / criteriaList.length) >= 7) {
            nextRef.current.classList.remove('pointer-events-none')
            nextRef.current.style.backgroundImage = "linear-gradient(to right, #07D5DF, #7F6DEF, #F408FE)"
        } else {
            nextRef.current.classList.add('pointer-events-none')
            nextRef.current.style.backgroundImage = "unset"
        }
    }

    function handleDispatchValue(event) {
        const inputList = [...document.querySelectorAll(`.${style.wrap_list} div input:checked`)]
        const criteriaTickList = inputList.map((item) => {
            return {
                "id": item.dataset.criteriaid,
                "name": item.value
            }
        })
        const currdentData = JSON.parse(sessionStorage.getItem('placeTemporary'))
        sessionStorage.setItem('placeTemporary', JSON.stringify({
            ...currdentData,
            userid: accountSupplier.id,
            criteriaList: [...criteriaTickList]
        }))
    }

    useEffect(() => {
        if (service.criteriaList) {
            const inputList = [...document.querySelectorAll(`.${style.wrap_list} div input`)]
            inputList.forEach((item) => {
                service.criteriaList.forEach((item1) => {
                    if(item1.criteriasModel && item1.criteriasModel.criterianame === item.value || item1.name === item.value)
                        item.checked = true
                })
            })
            handleCountTick()
        }
    })

    return (<div>
        <div className={`flex h-[100vh] relative`}>
            <div style={{ "backgroundImage": "linear-gradient(to top, #441EA5, #CE247A)" }} className="w-[50%] max966:hidden flex justify-center items-center px-10">
                <div className="text-6xl font-bold text-white italic">Tiếp theo, hãy chọn các tiêu chí <span className="text-green-600 underline">xanh</span> mà bạn muốn đăng ký trên ứng dụng của chúng thôi</div>
            </div>
            <div className="w-[50%] max966:w-full h-full flex flex-col justify-center items-center px-[120px] max1100:px-[50px] max477:px-[10px] relative">
                <div className="w-full">
                    <div className="text-2xl italic font-medium mb-3">Bấm chọn vào các tiêu chí bạn muốn đăng ký (tối thiểu 70%)</div>
                    <div className={`${cx('wrap_list')} h-[65vh] max966:h-[55vh] overflow-y-scroll px-3 pt-3`}>
                        {criteriaList && criteriaList.map((item) => {
                            return (<div key={item.id} className="flex items-center px-3 py-4 border-2 border-solid border-normal rounded-lg mb-3 cursor-pointer hover:border-black active:scale-[0.98]">
                                <div title={item.name} className="flex-1 ml-3 text-lg font-medium italic">{item.name}</div>
                                <input data-criteriaid={item.id} onChange={handleCountTick} value={item.name} className="w-[20px] h-[20px] pointer-events-none" type="checkbox" />
                            </div>)
                        })}
                    </div>
                </div>
            </div>

            <Link onClick={() => { sessionStorage.removeItem('placeTemporary') }} to='/host' className="z-10 fixed top-4 right-4 text-sm italic bg-slate-50 px-3 py-1 rounded-lg cursor-pointer hover:brightness-95 active:scale-95 select-none">Thoát</Link>
            <Link to='/host/registerservice/providetitle' style={{ "backgroundImage": "linear-gradient(to right, #07D5DF, #7F6DEF, #F408FE)" }} className="z-10 fixed bottom-8 max966:bottom-14 left-[55%] max966:left-[50%] max966:translate-x-[-50%] ssm640:w-[90%] italic text-white px-6 py-2 font-semibold rounded-lg cursor-pointer hover:brightness-95 active:scale-95 select-none">Quay lại</Link>
            <Link ref={nextRef} onClick={(e) => handleDispatchValue(e)} to='/host/registerservice/preview' style={{ "backgroundImage": "" }} className="bg-[#DDDDDD] z-10 fixed bottom-8 max966:bottom-2 right-8 max966:left-[50%] whitespace-nowrap max966:translate-x-[-50%] italic ssm640:w-[90%] ssm640:text-start text-center text-white px-6 py-2 font-semibold rounded-lg cursor-pointer hover:brightness-95 pointer-events-none active:scale-95 select-none">Lưu và xem lại địa điểm của bạn</Link>
        </div>
    </div>);
}

export default ProvideCriteria;