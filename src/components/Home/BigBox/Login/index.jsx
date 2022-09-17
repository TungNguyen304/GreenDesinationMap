import {BsFacebook} from 'react-icons/bs'
import {FiUser} from 'react-icons/fi'
import {MdLockOutline} from 'react-icons/md'
import {AiFillWarning, AiFillGoogleCircle, AiFillTwitterCircle} from 'react-icons/ai'
import { useValueContext } from "../../../../hook";
import { useRef } from "react";
import { useEffect } from "react";


function Login() {
    const value = useValueContext()
    const phone = useRef()
    const warning = useRef()
    const loginRef = useRef()

    useEffect(() => {
        // handleHiddenWarn()
    })

    function handleConditionLogin() {
        // if(phone.current.value.length === 10 && Number.isInteger(Number(phone.current.value))) {
        //     localStorage.setItem('phone', phone.current.value)
        //     value.handleDisplayBigBox()
        //     window.location.reload()
        // }
        // else {
        //     handleDisplayWarn()
        // }
    }

    // function handleDisplayWarn() {
    //     if(phone.current.value.length !== 10 || !Number.isInteger(Number(phone.current.value)))
    //     {
    //         warning.current.classList.remove('hidden')
    //         warning.current.classList.add('flex')
    //         phone.current.classList.add('border-red-600')
    //     }
    // }

    // function handleHiddenWarn() {
    //     warning.current.classList.add('hidden')
    //     warning.current.classList.remove('flex')
    //     phone.current.classList.remove('border-red-600')
    // }

    return ( <div ref={loginRef} className="px-5">
        <h2 className="text-xl mt-3 font-semibold mb-6 text-slate-900 italic">
            Chào mừng bạn đến với GreenMap
        </h2>
        <div ref={warning} className="items-center mb-1 hidden">
            <AiFillWarning className="text-red-600 mr-2"/>
            <span className="text-sm text-red-600">Số điện thoại của bạn không hợp lệ</span>
        </div>
        <label htmlFor="username" className="text-sm italic">Username</label>
        <div className="flex items-center border-b-2 border-solid border-normal mb-5 ">
            <FiUser className="text-color_nav_item text-xl"/>
            <input id="username" ref={phone} className={` w-full outline-none py-4 px-5 rounded-xl placeholder:italic`}  type="text" placeholder="Type your username"/>
        </div>
        <label htmlFor="password" className="text-sm italic">Password</label>
        <div className="flex items-center border-b-2 border-solid border-normal mb-2">
            <MdLockOutline className="text-color_nav_item text-xl"/>
            <input id="password" className={` w-full outline-none py-4 px-5 rounded-xl placeholder:italic`} type="text" placeholder="Type your password"/>
        </div>
        <div className='flex justify-between text-xs mt-1 cursor-pointer text-gray-500 mb-8 italic'>
            <div className='underline'>Đăng ký</div>
            <div className='flex items-center'>
                <input type="checkbox" name="" id="" />
                <span className='ml-2'>Show password</span>
            </div>
        </div>
        <button onClick={handleConditionLogin} style={{'backgroundColor': 'var(--primary)', "backgroundImage": "linear-gradient(to right, #07D5DF, #7F6DEF, #F408FE)"}} className="italic text-white py-3 rounded-full hover:brightness-90 active:scale-[0.98] mt-4 flex justify-center w-full font-semibold">SUBMIT</button>
        <div className="mt-10 mb-10 flex relative justify-center">
            <div style={{'backgroundColor': 'var(--border'}} className="absolute left-0 top-[50%] h-[1px] w-[45%]"></div>
            <span className="text-xs italic">Hoặc</span>
            <div style={{'backgroundColor': 'var(--border'}} className="absolute right-0 top-[50%] h-[1px] w-[45%]"></div>
        </div>
        <div className='text-center mb-2 text-sm italic'>Sign up using</div>
        <div className="flex justify-center items-center">
            <div className="rounded-full mx-1 p-[3px]">
                <BsFacebook className="text-[#3B5998] text-[42px]"/>
            </div>
            <div className="rounded-full mx-1">
                <AiFillTwitterCircle className="text-[#1DA1F2] text-5xl"/>
            </div>
            <div className="rounded-full mx-1">
                <AiFillGoogleCircle className="text-[#EA4335] text-5xl"/>
            </div>
        </div>
        {/* <ButtonLogin text='Tiếp tục với Facebook' onclick={value.handleDisplayBigBox} color="#2D88FF" Icon={BsFacebook}/>
        <ButtonLogin text='Tiếp tục với Google' onclick={value.handleDisplayBigBox} Icon={FcGoogle}/>
        <ButtonLogin text='Tiếp tục với Apple' Icon={BsApple}/>
        <ButtonLogin text='Tiếp tục với Email' Icon={AiOutlineMail}/> */}

    </div> );
}

export default Login;