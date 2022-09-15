import {TiTick} from 'react-icons/ti'
import {AiFillStar} from 'react-icons/ai'
import {RiArrowRightSLine} from 'react-icons/ri'
import style from './profile.module.scss'
import classNames from 'classnames/bind';
import { useRef } from 'react';
import { useState } from 'react';
const cx = classNames.bind(style)

function Profile() {
    const changeAccountRef = useRef()
    const inputOldAccountRef = useRef()
    const inputNewAccountRef = useRef()
    const changeAvtRef = useRef()
    const accountRef = useRef()
    const inputImg = useRef()
    const [path, setPath] = useState()

    function handleDisplayChangeAccount(event) {
        if(event.target.textContent === 'Hủy') {
            inputOldAccountRef.current.value = ''
            inputNewAccountRef.current.value = ''
        }
        changeAccountRef.current.classList.toggle('hidden')
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
        const newPath = URL.createObjectURL(event.target.files[0])
        setPath(newPath)
    }

    return ( <div className={`${cx('profile')} w-full`}>
        <div ref={accountRef} className="w-[1032px] mx-auto flex">
            <div>
                <div className="w-[308px] mr-5 p-6 rounded-lg border border-solid border-normal">
                    <div className='flex flex-col items-center'>
                        <div className='flex justify-center mb-1 select-none'>
                            <img className='w-[128px] h-[128px] rounded-full' src="https://a0.muscache.com/defaults/user_pic-225x225.png?v=3" alt="" />
                        </div>
                        <div>
                            <div onClick={handleDisplayChangeAvt} className='text-sm font-medium underline cursor-pointer inline-block select-none'>Cập nhật ảnh</div>
                        </div>
                    </div>
                    <div className='w-full h-[0.5px] bg-normal my-7'></div>
                    <div>
                        <div className='text-xl font-medium mb-3'>Đã xác nhận</div>
                        <div className='flex items-center'>
                            <TiTick/>
                            Số điện thoại
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex-1'>
                <div className='ml-[40px]'>
                    <div className='text-3xl font-semibold'>Xin chào</div>
                    <div className='text-[#717171] mt-1'>Bắt đầu tham gia vào <span>2022</span></div>
                    <div onClick={(e) => handleDisplayChangeAccount(e)} className='select-none underline font-medium text-sm mt-3 cursor-pointer hover:bg-[#f1eeee] active:scale-[0.95] inline-block p-3 rounded-lg mx-[-12px]'>Thay đổi tài khoản đăng nhập</div>
                    <div ref={changeAccountRef} className='mt-9 border-b border-solid border-normal pb-7 hidden'>
                        <div>
                            <div className='font-light'>Nhập tài khoản cũ</div>
                            <input ref={inputOldAccountRef} className='w-full rounded-lg py-2 px-4 border border-solid border-normal' type="text" />
                        </div>
                        <div className='mt-4 mb-6'>
                            <div className='font-light'>Nhập tài khoản mới</div>
                            <input ref={inputNewAccountRef} className='w-full rounded-lg py-2 px-4 border border-solid border-normal' type="text" />
                        </div>
                        <div className='flex justify-between'>
                            <div onClick={(e) => handleDisplayChangeAccount(e)} className='font-medium underline hover:bg-[#f1eeee] cursor-pointer py-3 px-5 rounded-lg active:scale-[0.8]'>Hủy</div>
                            <button className='py-3 px-7 rounded-xl bg-[#222222] hover:bg-black text-white active:scale-[0.9]'>Lưu</button>
                        </div>
                    </div>
                    <div className='flex items-center py-7 border-b border-solid border-normal text-xl font-semibold'>
                        <AiFillStar className='mr-2'/>
                        <span>
                            <span>0</span> Đánh giá
                        </span>
                    </div>
                    <div className='py-7 text-sm font-medium underline cursor-pointer'>Đánh giá của bạn</div>
                </div>
            </div>
        </div>

        <div ref={changeAvtRef} className="w-[1032px] mx-auto hidden">
            <div className='w-[768px]'>
                <div className='flex items-center text-[#484848] font-semibold'>
                    <div onClick={handleDisplayChangeAvt} className='hover:underline cursor-pointer'>Hồ sơ</div>
                    <div className='mx-3'><RiArrowRightSLine/></div>
                    <div>Ảnh đại diện</div>
                </div>
                <div className='text-3xl text-[#484848] mt-3 mb-7 font-semibold'>
                Ảnh đại diện
            </div>
            <div>
                <div className='py-2 px-5 bg-[#edefed] text-[#484848] border-t border-l border-r border-solid border-normal'>
                    Ảnh đại diện
                </div>
                <div className='p-5 border border-solid border-normal flex'>
                    <div className={`w-[225px] h-[225px] bg-normal ${path ? 'rounded-full' : ''}`}>
                        <img className='w-[225px] h-[225px] rounded-full' src={path ? path : "https://a0.muscache.com/defaults/user_pic-225x225.png?v=3"} alt="" />
                    </div>
                    <div className='flex-1 ml-5'>
                        <div className={`${cx('description')} font-thin`}>
                            Ảnh đại diện cho thấy khuôn mặt của bạn có thể giúp các chủ nhà và khách khác làm quen với bạn. Airbnb yêu cầu tất cả chủ nhà phải có ảnh đại diện. Chúng tôi không yêu cầu khách phải có ảnh đại diện, nhưng chủ nhà có thể yêu cầu điều này. Nếu bạn là khách, ngay cả khi chủ nhà yêu cầu bạn đăng ảnh, họ sẽ không thể xem ảnh cho đến khi xác nhận yêu cầu đặt phòng của bạn.
                        </div>
                        <div onClick={autoClick} className='w-full border border-solid border-normal text-center py-2 rounded-md mt-3 cursor-pointer active:scale-[0.9] hover:bg-primary select-none hover:text-white'>
                            Tải lên tệp từ máy tính của bạn
                            <input ref={inputImg} onChange={handleOnChangeImg} className='hidden' type="file" name="" id="" />
                        </div>
                    </div>
                </div>
            </div>
            </div>
            
        </div>
    </div> );
}

export default Profile;