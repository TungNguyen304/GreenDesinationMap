import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function ProvideTitle() {
    const [length, setLength] = useState(0)
    const [text, setText] = useState('')
    const max = 500
    const nextRef = useRef()
    const service = JSON.parse(localStorage.getItem('placeTemporary'))

    function handleTyping(e) {
        setText(e.target.value)
        setLength(e.target.value.length)
    }

    useEffect(() => {
        if(service.description) {
            setText(service.description)
            setLength(service.description.length)
        }

    },[])

    useEffect(() => {
        if(length === 0 || length > 500) {
            nextRef.current.classList.add('pointer-events-none')
            nextRef.current.style.backgroundImage = "unset"
        }
        else {
            nextRef.current.classList.remove('pointer-events-none')
            nextRef.current.style.backgroundImage = "linear-gradient(to right, #07D5DF, #7F6DEF, #F408FE)"
        }
    }, [length])

    function handleDispatchValue(text) {
        const currdentData = JSON.parse(localStorage.getItem('placeTemporary'))
        localStorage.setItem('placeTemporary', JSON.stringify({
            ...currdentData,
            description: text
        }))
    }

    return (<div>
        <div className={`flex h-[100vh] relative`}>
            <div style={{ "backgroundImage": "linear-gradient(to top, #441EA5, #CE247A)" }} className="w-[50%] flex justify-center items-center px-10">
                <div className="text-6xl font-bold text-white italic">Tiếp theo, hãy thêm mô tả cho địa điểm của bạn</div>
            </div>
            <div className="w-[50%] h-full flex flex-col justify-center items-center px-[120px] relative">
                <div className="w-full">
                    <div className="text-2xl font-semibold italic mb-3">Tạo phần mô tả</div>
                    <textarea onChange={(e) => handleTyping(e)} value={text} className="w-full outline-none rounded-xl border border-solid border-[#b0b0b0] py-3 px-5 placeholder:text-lg italic" name="" id="" cols="30" rows="5" placeholder="Hãy viết phần mô tả của bạn ở đây"></textarea>
                    <div className="font-semibold italic">{length}/{max}</div>
                </div>
            </div>

            <Link onClick={() => {localStorage.removeItem('placeTemporary')}} to='/host' className="z-10 fixed top-4 right-4 text-sm italic bg-slate-50 px-3 py-1 rounded-lg cursor-pointer hover:brightness-95 active:scale-95 select-none">Thoát</Link>
            <Link to='/host/registerservice/providephotos' style={{ "backgroundImage": "linear-gradient(to right, #07D5DF, #7F6DEF, #F408FE)" }} className="z-10 fixed bottom-8 left-[55%] italic text-white px-6 py-2 font-semibold rounded-lg cursor-pointer hover:brightness-95 active:scale-95 select-none">Quay lại</Link>
            <Link onClick={() => {handleDispatchValue(text)}} ref={nextRef} to='/host/registerservice/providecriteria' style={{ "backgroundImage": "" }} className="bg-[#DDDDDD] cursor-pointer z-10 fixed bottom-8 right-8 italic text-white px-6 py-2 font-semibold rounded-lg hover:brightness-95 active:scale-95 select-none pointer-events-none">Lưu và đến bước tiếp theo</Link>
        </div>
    </div>);
}

export default ProvideTitle;