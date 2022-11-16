import {HiOutlineUser} from 'react-icons/hi'
import {MdLockOutline} from 'react-icons/md'
import accountApi from '../../../../api/accountApi';
import {AiOutlineArrowRight, AiOutlineMail, AiOutlinePhone} from 'react-icons/ai'
import { useState } from 'react';
import { useRef } from 'react';
import {AiFillWarning} from 'react-icons/ai'
import { useValueContext } from '../../../../hook';


function Register() {
    const {handleDisplayBigBox, handleSetBigBox} = useValueContext()
    const isUser = !window.location.pathname.includes("host")
    const [info, setInfo] = useState({
        "firstname": "",
        "lastname": "",
        "username": "",
        "email": "",
        "phonenumber": "",
        "gender": "",
        "password": "",
    })
    const [repassword, setRepassword] = useState("")
    const [warn, setWarn] = useState()
    const warnRef = useRef()

    function handleRegisterAccout(event) {
        let d = 0;
        const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const check = Object.keys(info).every((item) => {
            if(item === "phonenumber" && info[item].length!==10) {
                if(d===0) {
                    d++;
                    setWarn("Số điện thoại không hợp lệ")
                }
                return false
            } else if(item === "password" && info[item] !== repassword) {
                if(d === 0) {
                    d++;
                    setWarn("Mật khẩu nhập lại không khớp")
                }
                return false
            } if(item === "email" && !info[item].match(mailformat)) {
                if(d === 0) {
                    d++;
                    setWarn("Email không hợp lệ")
                }
                return false
            }
            return info[item] !== "";
        })

        if(check) {
            setWarn("")
            accountApi.register({
                ...info,
                "gender": info.gender === "Male",
                "startdate": new Date().toISOString().slice(0, 10),
                "roleid": {
                    "rolesname": isUser ? "USER" : "SUPPLIER"
                }
            })
            handleSetBigBox('Đăng Nhập', 'login')
        } else {
            if(d === 0) {
                setWarn("Bạn cần nhập đủ thông tin")
            }
        }
    }

    return ( <div>
        <div className='px-5'>
            <div className='flex justify-between mb-5'>
                <div className='border-b-2 border-solid border-gray-600'>
                    <input onChange={(e) => {setInfo({...info, 'firstname': e.target.value})}} className='w-[80%] py-2 placeholder:text-gray-600' type="text" placeholder="First Name"/>
                </div>
                <div className='border-b-2 border-solid border-gray-600'>
                    <input onChange={(e) => {setInfo({...info, 'lastname': e.target.value})}} className='w-[80%] py-2 placeholder:text-gray-600' type="text" placeholder="Last Name"/>
                </div>
            </div>
            <div className='w-full flex items-center border-b-2 border-solid border-gray-600 mb-5'>
                <input onChange={(e) => {setInfo({...info, 'username': e.target.value})}} className='w-full py-2 placeholder:text-gray-600' type="text"  name="" id="" placeholder="Username"/>
                <HiOutlineUser/>
            </div>
            <div className='w-full flex items-center border-b-2 border-solid border-gray-600 mb-5'>
                <input onChange={(e) => {setInfo({...info, 'email': e.target.value})}} className='w-full py-2 placeholder:text-gray-600' type="text" placeholder='Email Address'/>
                <AiOutlineMail/>
            </div>

            <div className='w-full flex items-center border-b-2 border-solid border-gray-600 mb-5'>
                <input onChange={(e) => {setInfo({...info, 'phonenumber': e.target.value})}} className='w-full py-2 placeholder:text-gray-600' type="text" placeholder='Phone Number'/>
                <AiOutlinePhone/>
            </div>

            <div className='w-full flex items-center border-b-2 border-solid border-gray-600 mb-5'>
                <input onChange={(e) => {setInfo({...info, 'gender': e.target.value})}} className='py-2 w-full placeholder:text-gray-600' type="text" name="city"  list="gender" placeholder='Gender'/>
                <datalist id='gender'>
                    <option value="Male"/>
                    <option value="FeMale"/>
                </datalist>
            </div>
            <div className='w-full flex items-center border-b-2 border-solid border-gray-600 mb-5'>
                <input onChange={(e) => {setInfo({...info, 'password': e.target.value})}} className='w-full py-2 placeholder:text-gray-600' type="text" placeholder='Password'/>
                <MdLockOutline/>
            </div>
            <div className='w-full flex items-center border-b-2 border-solid border-gray-600 mb-3'>
                <input onChange={(e) => {setRepassword(e.target.value)}} className='w-full py-2 placeholder:text-gray-600' type="text" placeholder='Confirm Password'/>
                <MdLockOutline/>
            </div>

            {warn && <div ref={warnRef} className='text-red-600 text-sm italic mb-5 flex items-center justify-end'>
                <AiFillWarning/>
                <span>{warn}</span>   
            </div>}

            <button onClick={(e) => {handleRegisterAccout(e)}} style={{"backgroundImage": "linear-gradient(to right, #07D5DF, #7F6DEF, #F408FE)"}} className='mb-5 bg-[#333] text-white py-3 px-10 flex items-center mx-auto rounded-full hover:opacity-90 active:scale-[0.98]'>
                <span className='font-semibold italic'>REGISTER</span>
                <AiOutlineArrowRight className='text-white ml-2'/>
            </button>
        </div>
    </div> );
}

export default Register;