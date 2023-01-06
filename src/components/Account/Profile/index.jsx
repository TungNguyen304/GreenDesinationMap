import { FiCheckCircle } from 'react-icons/fi'
import { AiFillStar, AiFillWarning } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { RiArrowRightSLine } from 'react-icons/ri'
import { HiOutlineUser } from 'react-icons/hi'
import { MdLockOutline } from 'react-icons/md'
import { AiOutlineArrowRight, AiOutlineMail, AiOutlinePhone } from 'react-icons/ai'
import avatarFirebase from '../../../firebase/avatar'
import style from './profile.module.scss'
import Avt from '../../../assets/images/avt.png'
import classNames from 'classnames/bind';
import accountApi from '../../../api/accountApi'
import { useRef } from 'react';
import { useState, useEffect } from 'react';
const cx = classNames.bind(style)

function Profile() {
    const passwordRef = useRef()
    const changeAvtRef = useRef()
    const warnRef = useRef()
    const buttonChangeAvtRef = useRef()
    const accountRef = useRef()
    const inputImg = useRef()
    const verifyInputRef = useRef()
    const [warn, setWarn] = useState()
    const [warnAvt, setWarnAvt] = useState()
    const [info, setInfo] = useState({
        "email": "",
        "firstname": "",
        "lastname": "",
        "phonenumber": "",
        "gender": "",
        "password": ""
    })
    const [path, setPath] = useState()
    const [account, setAccount] = useState()
    const [show, setShow] = useState(false)
    const [verifyPass, setVerifyPass] = useState()
    let acc = useSelector(state => state.accountReducer)
    const role = window.location.pathname.includes('/host') ? 2 : 1
    const [isChangingPass, setIsChangingPass] = useState(false)

    useEffect(() => {
        if (role === 2) {
            setAccount(acc.supplier)
        } else {
            setAccount(acc.user)
        }
    }, [acc, role])
    useEffect(() => {
        account && setInfo({
            "gender": account.gender === "Male",
            "email": account.email,
            "firstname": account.firstname,
            "lastname": account.lastname,
            "phonenumber": account.phonenumber,
            "password": "",
            "newPass": "1",
            "reNewPass": "1"
        })
    }, [account])

    function handleDisplayChangeAccount() {
        if (show === true) {
            setShow(false)
        }
        else {
            setShow(true)
        }
    }

    function handleDisplayChangeAvt() {
        accountRef.current.classList.toggle('flex')
        accountRef.current.classList.toggle('hidden')
        changeAvtRef.current.classList.toggle('hidden')
    }

    function autoClick() {
        inputImg.current.click()
    }

    function handleOnChangeImg(event) {
        const reader = new FileReader()
        reader.readAsDataURL(event.target.files[0])
        reader.onload = async function () {
            const blod = reader.result
            setPath(blod);
            if (account.avatarkey) {
                avatarFirebase.delete(account.avatarkey)
            }
            const name = await avatarFirebase.push(event.target.files[0].name, blod)
            const url = await avatarFirebase.get(name)
            accountApi.update({
                "userid": account.id,
                "gender": account.gender === "Male",
                "email": account.email,
                "avatar": url,
                "avatarkey": name,
                "stardate": new Date(account.startdate).toLocaleDateString("sv-SE"),
                "firstname": account.firstname,
                "lastname": account.lastname,
                "username": account.username,
                "password": verifyPass,
                "roleid": {
                    "rolesname": role === 1 ? "USER" : "SUPPLIER"
                },
                "phonenumber": account.phonenumber,
            })
                .then(() => {
                    window.location.reload()
                })
        }
    }

    async function handleUpdateProfile(e) {
        let d = 0;
        const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const checkformat = Object.keys(info).every((item) => {
            if (item === "phonenumber" && info[item].length !== 10) {
                if (d === 0) {
                    d++;
                    setWarn("Số điện thoại không hợp lệ")
                }
                return false
            } else if (isChangingPass && item === "reNewPass" && info[item] !== info["newPass"]) {
                if (d === 0) {
                    d++;
                    setWarn("Mật khẩu nhập lại không khớp")
                }
                return false
            } if (item === "email" && !info[item].match(mailformat)) {
                if (d === 0) {
                    d++;
                    setWarn("Email không hợp lệ")
                }
                return false
            }
            return info[item] !== "";
        })
        const checkPass = checkformat && await accountApi.verify({
            "username": account.username,
            "password": info.password
        })
            .catch((err) => {
                d++;
                setWarn("Sai mật khẩu, vui lòng thử lại!")
            })
        if (checkPass) {
            if (checkPass.data === true) {
                setWarn("")
                accountApi.update({
                    ...info,
                    "username": account.username,
                    "startdate": new Date(account.startdate).toLocaleDateString("sv-SE"),
                    "avatar": account.image,
                    "userid": account.id,
                    "roleid": {
                        "rolesname": role === 1 ? "USER" : "SUPPLIER"
                    },
                    "gender": info.gender === "Male",
                    "password": isChangingPass ? info.newPass : info.password
                }).then(() => {
                    window.location.reload()
                    alert("Update success!")
                }).catch(() => {
                    alert("Update fail!")
                })
            } else {
                setWarn("Sai mật khẩu, vui lòng thử lại")
            }
        } else {
            if (d === 0) {
                setWarn("Bạn cần nhập đủ thông tin")
            }
        }
    }

    async function handleVerifyPassword(event) {
        if (!verifyInputRef.current.value) {
            setWarnAvt("Vui lòng nhập mật khẩu của bạn.")
        }
        accountApi.verify({
            "username": account.username,
            "password": verifyInputRef.current.value
        })
            .then((res) => {
                if (res.data === true) {
                    setWarnAvt("")
                    setVerifyPass(verifyInputRef.current.value)
                    buttonChangeAvtRef.current.classList.remove('hidden')
                    event.nativeEvent.path[1].style.display = "none"
                } else {
                    setWarnAvt("Sai mật khẩu, vui lòng thử lại!")
                }
            })
            .catch((err) => {
                setWarnAvt("Sai mật khẩu, vui lòng thử lại!")
            })

    }


    return (<div className={`${cx('profile')} w-full`}>
        <div ref={accountRef} className="w-[80%] max840:w-full mx-auto flex ssm640:flex-col ssm640:items-center">
            <div className='w-[30%] ssm640:w-[50%] max400:w-[90%] max840:ml-[20px] ssm640:mb-10'>
                <div className=" mr-5 p-6 rounded-lg border border-solid border-normal">
                    <div className='flex flex-col items-center'>
                        <div className='flex justify-center mb-1 select-none'>
                            <img className='w-[128px] h-[128px] rounded-full' src={account && account.image ? account.image : Avt} alt="" />
                        </div>
                        <div>
                            <div onClick={handleDisplayChangeAvt} className='text-sm font-medium underline cursor-pointer inline-block select-none'>Cập nhật ảnh</div>
                        </div>
                    </div>
                    <div className='w-full h-[0.5px] bg-normal my-7'></div>
                    <div>
                        <div className='text-xl font-medium mb-3'>Đã xác nhận</div>
                        <div className='flex items-center'>
                            <FiCheckCircle className='text-[green] mr-2' />
                            Số điện thoại
                        </div>
                        <div className='flex items-center'>
                            <FiCheckCircle className='text-[green] mr-2' />
                            Email
                        </div>
                        <div className='flex items-center'>
                            <FiCheckCircle className='text-[green] mr-2' />
                            Tài khoản
                        </div>
                        <div className='flex items-center'>
                            <FiCheckCircle className='text-[green] mr-2' />
                            Mật khẩu
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex-1'>
                {account && <div className='ml-[40px] ssm640:ml-0'>
                    <div className='flex flex-col max324:items-center'>
                        <div className='text-3xl font-semibold'>Xin chào <span>{account.username}</span></div>
                        <div className='text-[#717171] mt-1'>Bắt đầu tham gia vào <span>{ }</span>{account.startday}</div>
                        <div onClick={(e) => handleDisplayChangeAccount(e)} className='select-none underline font-medium text-sm mt-3 cursor-pointer hover:bg-[#f1eeee] active:scale-[0.95] inline-block p-3 rounded-lg mx-[-12px]'>Thay đổi tài khoản đăng nhập</div>
                    </div>
                    {show && <div className='mt-9 border-b border-solid border-normal pb-7'>
                        <div className='px-5'>
                            <div className='flex justify-between mb-5'>
                                <div className='border-b-2 flex-1 mr-10 border-solid border-gray-600'>
                                    <input onChange={(e) => { setInfo({ ...info, "firstname": e.target.value }) }} className='w-[80%] py-2 placeholder:text-gray-600' type="text" placeholder="First Name" defaultValue={account.firstname} />
                                </div>
                                <div className='border-b-2 flex-1 border-solid border-gray-600'>
                                    <input onChange={(e) => { setInfo({ ...info, "lastname": e.target.value }) }} className='w-[80%] py-2 placeholder:text-gray-600' type="text" placeholder="Last Name" defaultValue={account.lastname} />
                                </div>
                            </div>
                            <div className='w-full flex items-center border-b-2 border-solid border-gray-600 mb-5'>
                                <input readOnly className='w-full py-2 placeholder:text-gray-600' type="text" name="" id="" placeholder="Username" defaultValue={account.username} />
                                <HiOutlineUser />
                            </div>
                            <div className='w-full flex items-center border-b-2 border-solid border-gray-600 mb-5'>
                                <input onChange={(e) => { setInfo({ ...info, "email": e.target.value }) }} className='w-full py-2 placeholder:text-gray-600' type="text" placeholder='Email Address' defaultValue={account.email} />
                                <AiOutlineMail />
                            </div>

                            <div className='w-full flex items-center border-b-2 border-solid border-gray-600 mb-5'>
                                <input onChange={(e) => { setInfo({ ...info, "phonenumber": e.target.value }) }} className='w-full py-2 placeholder:text-gray-600' type="text" placeholder='Phone Number' defaultValue={account.phonenumber} />
                                <AiOutlinePhone />
                            </div>

                            <div className='w-full flex items-center border-b-2 border-solid border-gray-600 mb-5'>
                                <input onChange={(e) => { setInfo({ ...info, "gender": e.target.value }) }} className='py-2 w-full placeholder:text-gray-600' type="text" name="city" list="gender" placeholder='Gender' defaultValue={account.gender} />
                                <datalist id='gender'>
                                    <option value="Male" />
                                    <option value="FeMale" />
                                </datalist>
                            </div>
                            <div className='w-full flex items-center border-b-2 border-solid border-gray-600 mb-5'>
                                <input onChange={(e) => { setInfo({ ...info, "password": e.target.value }) }} value={info.password} defaultValue={info.password} className='w-full py-2 placeholder:text-gray-600' type="password" placeholder='Password' />
                                <MdLockOutline />
                            </div>
                            <div onClick={(e) => {
                                passwordRef.current.classList.toggle('hidden')
                                setIsChangingPass(!isChangingPass)
                                if (isChangingPass)
                                    setInfo({ ...info, "newPass": "1", "reNewPass": "1" })
                                else
                                    setInfo({ ...info, "newPass": "", "reNewPass": "" })
                            }} className='italic cursor-pointer hover:underline mb-5'>
                                Change password
                            </div>
                            <div ref={passwordRef} className='hidden'>
                                <div className='w-full flex items-center border-b-2 border-solid border-gray-600 mb-5'>
                                    <input onChange={(e) => { setInfo({ ...info, "newPass": e.target.value }) }} className='w-full py-2 placeholder:text-gray-600' type="password" placeholder='New Password' />
                                    <MdLockOutline />
                                </div>
                                <div className='w-full flex items-center border-b-2 border-solid border-gray-600 mb-8'>
                                    <input onChange={(e) => { setInfo({ ...info, "reNewPass": e.target.value }) }} className='w-full py-2 placeholder:text-gray-600' type="password" placeholder='Verify New Password' />
                                    <MdLockOutline />
                                </div>
                            </div>
                        </div>
                        {warn && <div ref={warnRef} className='text-red-600 text-sm italic mb-5 flex items-center justify-end'>
                            <AiFillWarning />
                            <span>{warn}</span>
                        </div>}
                        <div className='flex justify-between max324:flex-col'>
                            <div onClick={(e) => handleDisplayChangeAccount(e)} style={{ "backgroundImage": "linear-gradient(to right, #07D5DF, #7F6DEF, #F408FE)" }} className='text-white font-semibold italic hover:opacity-90 cursor-pointer py-3 px-5 text-center rounded-full min-w-[80px] active:scale-[0.98] max324:mx-7 max324:mb-5'>Hủy</div>
                            <button onClick={handleUpdateProfile} style={{ "backgroundImage": "linear-gradient(to right, #07D5DF, #7F6DEF, #F408FE)" }} className='bg-[#333] text-white py-3 px-10 flex items-center justify-end max324:justify-center mx-5 max324:mx-7 rounded-full hover:opacity-90 active:scale-[0.98]'>
                                <span className='font-semibold italic'>Lưu thay đổi</span>
                                <AiOutlineArrowRight className='text-white ml-2' />
                            </button>
                        </div>
                    </div>}
                    <div className='flex items-center py-7 border-b border-solid border-normal text-xl font-semibold'>
                        <AiFillStar className='mr-2' />
                        <span>
                            <span>0</span> Đánh giá
                        </span>
                    </div>
                    <div className='p-3 mt-4 text-sm hover:bg-[#f1eeee] active:scale-[0.95] rounded-xl inline-block font-medium underline cursor-pointer'>Đánh giá của bạn</div>
                </div>}
            </div>
        </div>

        <div ref={changeAvtRef} className="w-[80%] max840:w-[90%] mx-auto hidden">
            <div className='w-[90%] max840:w-full'>
                <div className='flex items-center text-[#484848] font-semibold'>
                    <div onClick={handleDisplayChangeAvt} className='hover:underline cursor-pointer'>Hồ sơ</div>
                    <div className='mx-3'><RiArrowRightSLine /></div>
                    <div>Ảnh đại diện</div>
                </div>
                <div className='text-3xl text-[#484848] mt-3 mb-7 font-semibold'>
                    Ảnh đại diện
                </div>
                <div>
                    <div className='py-2 px-5 bg-[#edefed] text-[#484848] border-t border-l border-r border-solid border-normal'>
                        Ảnh đại diện
                    </div>
                    <div className='p-5 border border-solid border-normal flex max600:flex-col max600:items-center '>
                        <div className={`w-[225px] h-[225px] bg-normal max600:mb-10 ${path ? 'rounded-full' : ''}`}>
                            <img className='w-[225px] h-[225px] rounded-full' src={path ? path : account && account.image ? account.image : Avt} alt="" />
                        </div>
                        <div className='flex-1 ml-5 max600:ml-0'>
                            <div className={`${cx('description')} font-thin`}>
                                Ảnh đại diện cho thấy khuôn mặt của bạn có thể giúp các chủ nhà và khách khác làm quen với bạn. Green Desination Map yêu cầu tất cả chủ nhà phải có ảnh đại diện. Chúng tôi không yêu cầu khách phải có ảnh đại diện, nhưng chủ nhà có thể yêu cầu điều này. Nếu bạn là khách, ngay cả khi chủ nhà yêu cầu bạn đăng ảnh, họ sẽ không thể xem ảnh cho đến khi xác nhận yêu cầu đặt phòng của bạn.
                            </div>
                            <div ref={buttonChangeAvtRef} onClick={autoClick} className='hidden w-full border border-solid border-normal text-center py-2 rounded-md mt-3 cursor-pointer active:scale-[0.9] hover:bg-primary select-none hover:text-white'>
                                Tải lên tệp từ thiết bị của bạn
                                <input ref={inputImg} onChange={handleOnChangeImg} className='hidden' type="file" name="" id="" />
                            </div>
                            {warnAvt && <div className='text-red-600 text-sm italic mb-5 flex items-center justify-end'>
                                <AiFillWarning />
                                <span>{warnAvt}</span>
                            </div>}
                            <div className='flex justify-between mt-5'>
                                <input ref={verifyInputRef} className='border border-solid border-black flex-1 pl-3 py-1 rounded-lg' type="password" placeholder='Nhập mật khẩu để xác thực...' />
                                <button onClick={(e) => handleVerifyPassword(e)} className='ml-3 py-1 px-3 bg-green-600 text-white rounded-lg'>Xác nhận</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>);
}

export default Profile;