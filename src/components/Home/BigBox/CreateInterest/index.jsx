import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useValueContext } from "../../../../hook";
import interestApi from "../../../../api/interestApi";

function CreateInterest() {
    const labelRef = useRef()
    const buttonRef = useRef()
    const inputRef = useRef()
    const context = useValueContext()
    const [value, setValue] = useState('')
    const serviceInterest = useSelector(state => state.serviceReducer.service)
    useEffect(() => {
        if(value != '') {
            buttonRef.current.disabled = false
        }
        else
            buttonRef.current.disabled = true
    })

    function pushInterest() {
        const interest = {
            "name": inputRef.current.value,
            "list": [serviceInterest].join()
        }
        interestApi.push(interest)
        context.handleSetBigBox('Danh sách yêu thích của bạn', 'interests')
    }

    function handleLabelForcus(even) {
        labelRef.current.style.transform = 'translate(-4px, -12px) scale(0.7)'
        even.target.style.position = 'absolute'
        even.target.style.bottom = '4px'
        even.target.parentElement.parentElement.style.border = '2px solid black'
        
    }
    function handleLabelBlur(even) {
        if(!inputRef.current.value) {
            labelRef.current.style.transform = 'unset'
            even.target.style.position = 'unset'
            even.target.style.bottom = 'unset'
        }
        even.target.parentElement.parentElement.style.border = '1px solid #717171'
    }

    return ( <div className="py-[20px] px-[10px]">
        <div className="mb-11">
            {/* <input type="text" placeholder="Tên" className="py-4 rounded-md w-full px-3 border border-solid border-normal"/> */}
            <div className="border h-[56px] flex items-center flex-1 px-3 py-4 relative overflow-hidden border-solid border-[#717171] rounded-lg w-full">
                <div ref={labelRef} style={{'transition': 'all 0.15s ease-out'}} className="absolute cursor-text">
                    <label htmlFor="interest" className="text-[#717171] cursor-text select-none">Tên</label>
                </div>
                <div className="w-full">
                    <input ref={inputRef} onFocus={(e) => handleLabelForcus(e)} onChange={(e) => setValue(e.target.value)} onBlur={(e) => handleLabelBlur(e)} className="outline-none w-[80%]" type="text" id="interest" />
                </div>
            </div>
        </div>
        <div>
            <button ref={buttonRef} onClick={pushInterest} className="bg-[#222222] w-full rounded-lg text-white disabled:bg-[#DDDDDD] disabled:cursor-not-allowed hover:bg-black p-4 flex justify-center"><span>Tạo</span></button>
        </div>
    </div> );
}

export default CreateInterest;