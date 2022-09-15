import ButtonLogin from "../../../common/ButtonLogin";
import {BsFacebook, BsApple} from 'react-icons/bs'
import {FcGoogle} from 'react-icons/fc'
import {AiOutlineMail, AiFillWarning} from 'react-icons/ai'
import { useValueContext } from "../../../../hook";
import { useRef } from "react";
import { useEffect } from "react";


function Login() {
    const value = useValueContext()
    const phone = useRef()
    const warning = useRef()
    const loginRef = useRef()

    useEffect(() => {
        handleHiddenWarn()
    })

    function handleConditionLogin() {
        if(phone.current.value.length === 10 && Number.isInteger(Number(phone.current.value))) {
            localStorage.setItem('phone', phone.current.value)
            value.handleDisplayBigBox()
            window.location.reload()
        }
        else {
            handleDisplayWarn()
        }
    }

    function handleDisplayWarn() {
        if(phone.current.value.length !== 10 || !Number.isInteger(Number(phone.current.value)))
        {
            warning.current.classList.remove('hidden')
            warning.current.classList.add('flex')
            phone.current.classList.add('border-red-600')
        }
    }

    function handleHiddenWarn() {
        warning.current.classList.add('hidden')
        warning.current.classList.remove('flex')
        phone.current.classList.remove('border-red-600')
    }

    return ( <div ref={loginRef}>
        <h2 className="text-xl mt-3 font-semibold mb-6">
            Chào mừng bạn đến với GreenMap
        </h2>
        <div ref={warning} className="items-center mb-1 hidden">
            <AiFillWarning className="text-red-600 mr-2"/>
            <span className="text-sm text-red-600">Số điện thoại của bạn không hợp lệ</span>
        </div>
        <input onBlur={handleDisplayWarn} onFocus={handleHiddenWarn} ref={phone} className={`w-full outline-none py-4 px-5 rounded-xl border border-solid border-[#cbc4c4]" type="text" placeholder="Số điện thoại`}/>
        <p className="text-xs mt-1">Chúng tôi sẽ gọi điện hoặc nhắn tin cho bạn để xác nhận số điện thoại. Có áp dụng phí dữ liệu và phí tin nhắn tiêu chuẩn. Chính sách về quyền riêng tư</p>
        <button onClick={handleConditionLogin} style={{'backgroundColor': 'var(--primary)'}} className="text-white py-3 rounded-lg mt-4 flex justify-center w-full">Tiếp tục</button>
        <div className="mt-5 mb-5 flex relative justify-center">
            <div style={{'backgroundColor': 'var(--border'}} className="absolute left-0 top-[50%] h-[1px] w-[45%]"></div>
            <span className="text-xs">Hoặc</span>
            <div style={{'backgroundColor': 'var(--border'}} className="absolute right-0 top-[50%] h-[1px] w-[45%]"></div>
        </div>
        <ButtonLogin text='Tiếp tục với Facebook' onclick={value.handleDisplayBigBox} color="#2D88FF" Icon={BsFacebook}/>
        <ButtonLogin text='Tiếp tục với Google' onclick={value.handleDisplayBigBox} Icon={FcGoogle}/>
        <ButtonLogin text='Tiếp tục với Apple' Icon={BsApple}/>
        <ButtonLogin text='Tiếp tục với Email' Icon={AiOutlineMail}/>

    </div> );
}

export default Login;