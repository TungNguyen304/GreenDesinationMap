import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useValueContext } from "../../../../hook";
import interestApi from "../../../../api/interestApi";
import { useNavigate } from "react-router-dom";

function CreateInterest(name) {
    console.log(name);
    const labelRef = useRef()
    const buttonRef = useRef()
    const navigate = useNavigate()
    const inputRef = useRef()
    const context = useValueContext()
    const account = useSelector(state => state.accountReducer.user)
    const id = window.location.pathname.replace('/detailwishlist/', '')
    const [value, setValue] = useState('')

    useEffect(() => {
        if (value !== '') {
            if (buttonRef.current)
                buttonRef.current.disabled = false
        }
        else
            if (buttonRef.current)
                buttonRef.current.disabled = true
    })

    useEffect(() => {
        if (name) {
            setValue(name.name)
            labelRef.current.style.transform = 'translate(-4px, -12px) scale(0.7)'
            inputRef.current.style.position = 'absolute'
            inputRef.current.style.bottom = '4px'
            inputRef.current.parentElement.parentElement.style.border = '2px solid black'
        }
    }, [])

    function pushInterest(event) {
        if ((event.type === "keydown" && event.code === "Enter" && event.keyCode === 13) || event.type === "click") {
            context.loadRef().classList.remove("hidden")
            const interest = {
                "wishlistname": inputRef.current.value,
                "userModel": {
                    "userid": account.id
                }
            }
            interestApi.add(interest)
                .then(() => {
                    context.loadRef().classList.add("hidden")
                    context.handleSetBigBox('Danh sách yêu thích của bạn', 'interests')
                })
                .catch(() => {
                    context.loadRef().classList.add("hidden")
                })

        }

    }

    function handleUpdate(event) {
        if ((event.type === "keydown" && event.code === "Enter" && event.keyCode === 13) || event.type === "click") {
            sessionStorage.setItem("interest", value)
            interestApi.update({
                "wishlistid": id,
                "wishlistname": value,
                "userModel": {
                    "userid": account.id
                }
            })
            context.handleDisplayBigBox()
        }
    }

    async function handleDelete() {
        context.loadRef().classList.remove("hidden")
        await interestApi.delete(id)
        context.loadRef().classList.add("hidden")
        navigate(-1)
        context.handleDisplayBigBox()
    }

    function handleLabelForcus(even) {
        labelRef.current.style.transform = 'translate(-4px, -12px) scale(0.7)'
        even.target.style.position = 'absolute'
        even.target.style.bottom = '4px'
        even.target.parentElement.parentElement.style.border = '2px solid black'

    }
    function handleLabelBlur(even) {
        if (!inputRef.current.value) {
            labelRef.current.style.transform = 'unset'
            even.target.style.position = 'unset'
            even.target.style.bottom = 'unset'
        }
        even.target.parentElement.parentElement.style.border = '1px solid #717171'
    }

    return (<div className="py-[20px] px-[10px]">
        <div className="mb-11">
            <div className="border h-[56px] flex items-center flex-1 px-3 py-4 relative overflow-hidden border-solid border-[#717171] rounded-lg w-full">
                <div ref={labelRef} style={{ 'transition': 'all 0.15s ease-out' }} className="absolute cursor-text">
                    <label htmlFor="interest" className="text-[#717171] cursor-text select-none">Tên</label>
                </div>
                <div className="w-full">
                    <input ref={inputRef} value={value} onKeyDown={(e) => { name.name ? handleUpdate(e) : pushInterest(e) }} onFocus={(e) => handleLabelForcus(e)} onChange={(e) => setValue(e.target.value)} onBlur={(e) => handleLabelBlur(e)} className="outline-none w-[80%]" type="text" id="interest" />
                </div>
            </div>
        </div>
        <div>
            {name.name ?
                <div className="flex justify-center">
                    <button onClick={(e) => { handleUpdate(e) }} className="px-4 rounded-lg bg-black text-white py-2 mr-3">Update</button>
                    <button onClick={handleDelete} className="px-4 rounded-lg bg-black text-white py-2">Delete</button>
                </div>
                :
                <button ref={buttonRef} onClick={(e) => { pushInterest(e) }} className="bg-gradient-to-r from-[#07D5DF] to-[#F408FE] w-full text-xl italic rounded-full text-white disabled:bg-gradient-to-r disabled:from-[#DDD] disabled:to-[#DDD] disabled:cursor-not-allowed hover:bg-black px-4 py-2 flex justify-center"><span>Tạo</span></button>}
        </div>
    </div>);
}

export default CreateInterest;