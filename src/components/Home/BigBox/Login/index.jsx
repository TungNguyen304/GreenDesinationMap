import { BsFacebook } from 'react-icons/bs'
import { FiUser } from 'react-icons/fi'
import { MdLockOutline } from 'react-icons/md'
import { AiFillWarning, AiFillGoogleCircle, AiFillTwitterCircle } from 'react-icons/ai'
import { useValueContext } from "../../../../hook";
import { useRef } from "react";
import accountApi from '../../../../api/accountApi'


function Login() {
    const value = useValueContext()
    const warning1 = useRef()
    const warning2 = useRef()
    const warning3 = useRef()
    const passwordRef = useRef()
    const usernameRef = useRef()
    const role = window.location.pathname.includes('/host') ? 2 : 1
    console.log(value.loadRef.classList.add("abc"));
    console.log(value.loadRef.classList.remove("abc"));
    console.log(value.loadRef.classList);
    function handleConditionLogin() {
        (async () => {
            value.loadRef.classList.remove("hidden")
            const data = await accountApi.post({
                "username": usernameRef.current.value,
                "password": passwordRef.current.value
            })
                .catch((err) => {
                    warning3.current.classList.remove('hidden')
                    warning3.current.classList.add('flex')
                    value.loadRef.classList.add("hidden")
                })
            if (data && data.data.accessToken) {
                (async () => {
                    const res = await accountApi.getLogin({}, data.data.accessToken)
                    if (res && res.data.role === role) {
                        if(role === 1) {
                            localStorage.setItem('user', data.data.accessToken)
                        } else {
                            localStorage.setItem('supplier', data.data.accessToken)
                        }
                        window.location.reload()
                    } else {
                        warning3.current.classList.remove('hidden')
                        warning3.current.classList.add('flex')
                        value.loadRef.classList.add("hidden")
                    }
                })()
            } else {
                warning3.current.classList.remove('hidden')
                warning3.current.classList.add('flex')
                value.loadRef.classList.add("hidden")
            }
        })()

    }

    function handleDisplayWarn(event, type) {
        if (event.target.value === "") {
            event.nativeEvent.path[1].classList.remove('border-b-2')
            event.nativeEvent.path[1].classList.add('border')
            event.nativeEvent.path[1].classList.add('px-3')
            event.nativeEvent.path[1].classList.add('border-solid')
            event.nativeEvent.path[1].classList.add('border-red-600')
            event.nativeEvent.path[1].classList.add('rounded-lg')
            if (type === 1) {
                warning1.current.classList.remove('hidden')
                warning1.current.classList.add('flex')
            }
            else {
                warning2.current.classList.remove('hidden')
                warning2.current.classList.add('flex')
            }
        }
    }

    function handleHiddenWarn(event, type) {
        event.nativeEvent.path[1].classList.add('border-b-2')
        event.nativeEvent.path[1].classList.remove('border')
        event.nativeEvent.path[1].classList.remove('px-3')
        event.nativeEvent.path[1].classList.remove('border-solid')
        event.nativeEvent.path[1].classList.remove('border-red-600')
        event.nativeEvent.path[1].classList.remove('rounded-lg')
        if (type === 1) {
            warning1.current.classList.add('hidden')
            warning1.current.classList.remove('flex')
        }
        else {
            warning2.current.classList.add('hidden')
            warning2.current.classList.remove('flex')
        }
        warning3.current.classList.add('hidden')
        warning3.current.classList.remove('flex')
    }

    function handleDisplayPassword(event) {
        if (event.target.checked) {
            passwordRef.current.type = "text"
        }
        else {
            passwordRef.current.type = "password"
        }
    }

    function handleDisplayRegister() {
        value.handleSetBigBox('Đăng ký', 'register')
    }

    return (<div className="px-5">
        <h2 className="text-xl mt-3 font-semibold mb-6 text-slate-900 italic">
            Chào mừng bạn đến với GreenMap
        </h2>

        <label htmlFor="username" className="text-sm italic inline-block mb-1">Username</label>
        <div className="flex items-center border-b-2 border-solid border-normal">
            <FiUser className="text-color_nav_item text-xl" />
            <input ref={usernameRef} onBlur={(e) => handleDisplayWarn(e, 1)} onFocus={(e) => handleHiddenWarn(e, 1)} id="username" className={` w-full outline-none py-3 px-5 rounded-xl placeholder:italic`} type="text" placeholder="Type your username" />
        </div>
        <div ref={warning1} className="hidden items-center mb-1 mt-1">
            <AiFillWarning className="text-red-600 mr-1 pb-[1px] text-sm" />
            <span className="text-xs text-red-600">Vui lòng nhập tên tài khoản của bạn</span>
        </div>


        <label htmlFor="password" className="text-sm italic mt-5 inline-block mb-1">Password</label>
        <div className="flex items-center border-b-2 border-solid border-normal mb-1 ">
            <MdLockOutline className="text-color_nav_item text-xl" />
            <input ref={passwordRef} type="password" onBlur={(e) => handleDisplayWarn(e, 2)} onFocus={(e) => handleHiddenWarn(e, 2)} id="password" className={` w-full outline-none py-3 px-5 rounded-xl placeholder:italic`} placeholder="Type your password" />
        </div>
        <div ref={warning2} className="hidden items-center mb-5">
            <AiFillWarning className="text-red-600 mr-1 pb-[1px] text-sm" />
            <span className="text-xs text-red-600">Vui lòng nhập mật khẩu của bạn</span>
        </div>

        <div ref={warning3} className="hidden items-center mb-5">
            <AiFillWarning className="text-red-600 mr-1 pb-[1px] text-sm" />
            <span className="text-xs text-red-600">tài khoản hoặc mật khẩu không chính xác</span>
        </div>

        <div className='flex justify-between text-xs mt-1 text-gray-500 mb-8 italic'>
            <div onClick={() => handleDisplayRegister()} className='underline cursor-pointer'>Đăng ký</div>
            <div className='flex items-center'>
                <input onChange={(e) => handleDisplayPassword(e)} type="checkbox" name="" id="" />
                <span className='ml-2'>Show password</span>
            </div>
        </div>
        <button onClick={handleConditionLogin} style={{ 'backgroundColor': 'var(--primary)', "backgroundImage": "linear-gradient(to right, #07D5DF, #7F6DEF, #F408FE)" }} className="italic text-white py-3 rounded-full hover:brightness-90 active:scale-[0.98] mt-4 flex justify-center w-full font-semibold">SUBMIT</button>
        <div className="mt-10 mb-10 flex relative justify-center">
            <div style={{ 'backgroundColor': 'var(--border' }} className="absolute left-0 top-[50%] h-[1px] w-[45%]"></div>
            <span className="text-xs italic">Hoặc</span>
            <div style={{ 'backgroundColor': 'var(--border' }} className="absolute right-0 top-[50%] h-[1px] w-[45%]"></div>
        </div>
        <div className='text-center mb-2 text-sm italic'>Sign up using</div>
        <div className="flex justify-center items-center">
            <div className="rounded-full mx-1 p-[3px]">
                <BsFacebook className="text-[#3B5998] text-[42px]" />
            </div>
            <div className="rounded-full mx-1">
                <AiFillTwitterCircle className="text-[#1DA1F2] text-5xl" />
            </div>
            <div className="rounded-full mx-1">
                <AiFillGoogleCircle className="text-[#EA4335] text-5xl" />
            </div>
        </div>
        {/* <ButtonLogin text='Tiếp tục với Facebook' onclick={value.handleDisplayBigBox} color="#2D88FF" Icon={BsFacebook}/>
        <ButtonLogin text='Tiếp tục với Google' onclick={value.handleDisplayBigBox} Icon={FcGoogle}/>
        <ButtonLogin text='Tiếp tục với Apple' Icon={BsApple}/>
        <ButtonLogin text='Tiếp tục với Email' Icon={AiOutlineMail}/> */}

    </div>);
}

export default Login;