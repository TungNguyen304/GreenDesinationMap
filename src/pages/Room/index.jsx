import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import { useSelector } from "react-redux";
import { AiFillStar } from 'react-icons/ai'
import { TiHeartFullOutline, TiLocation } from 'react-icons/ti'
import { MdVerifiedUser } from 'react-icons/md'

import style from './room.module.scss'
import classNames from 'classnames/bind';
import { useEffect } from "react";
const cx = classNames.bind(style)

function Room() {
    const service = JSON.parse(localStorage.getItem('service'))
    useEffect(() => {
        localStorage.setItem('service', JSON.stringify(service))
        return () => {
            localStorage.removeItem('service')
        }
    })
    return ( <div className={`${cx("room")}`}>
        <Header/>
        <div className={`small_wrap my-[100px]`}>
            <div className="text-2xl font-semibold">
                {service.name}
            </div>
            <div className="flex justify-between cursor-pointer mt-3 mb-5">
                <div className="flex">
                    <div className="flex items-center mr-5">
                        <AiFillStar/>
                        <span>{service.star}</span>
                    </div>
                    <div className="flex underline mr-5">
                        <div><span>180</span> Đánh giá</div>
                    </div>
                    <div className="flex items-center underline">
                        <TiLocation/>
                        {service.address}
                    </div>
                </div>
                <div className="flex items-center underline active:scale-[0.8] select-none">
                    <TiHeartFullOutline style={{'fill': 'white', 'stroke': 'black', 'strokeWidth': '1px'}} className="text-base w-[24px] h-[20px] select-none mr-1"/>
                    <span>Lưu</span>
                </div>
            </div>
            <div className="flex h-[390px] rounded-xl overflow-hidden">
                <div className="flex-1 h-full mr-2">
                    <img className="h-full w-full" src={service.images[0]} alt="" />
                </div>
                <div className="flex-1 flex flex-col h-full">
                    <div className="flex-1 flex h-[50%] mb-2">
                        <div className="flex-1 h-full mr-2">
                            <img className="h-full w-full" src={service.images[1]} alt="" />
                        </div>
                        <div className="flex-1">
                            <img className="h-full w-full" src={service.images[2]} alt="" />
                        </div>
                    </div>
                    <div className="flex-1 flex h-50%">
                        <div className="flex-1 h-full mr-2">
                            <img className="h-full w-full" src={service.images[3]} alt="" />
                        </div>
                        <div className="flex-1">
                            <img className="h-full w-full" src={service.images[4]} alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-[50%]">
                <div className="flex justify-between items-center mt-9">
                    <div className="text-2xl font-semibold mb-3">
                        <span>Người đăng ký: {service.host}</span>
                    </div>
                    <div>
                        <img className="w-[56px] h-[56px] rounded-full" src="https://a0.muscache.com/im/pictures/user/237512e2-5c40-40e9-86de-6a7c84e6882b.jpg?im_w=240" alt="" />
                    </div>
                </div>
                <div className="border-b border-solid border-normal pb-6">
                    {service.description}
                </div>
            </div>
            <div className="mt-6">
                <div className="flex items-center">
                    <div className="mr-5">
                        <img className="w-[64px] h-[64px] rounded-full" src="https://a0.muscache.com/im/pictures/user/237512e2-5c40-40e9-86de-6a7c84e6882b.jpg?im_w=240" alt="" />
                    </div>
                    <div>
                        <div className="text-lg font-semibold">Người đăng ký: {service.host}</div>
                        <div>Đã tham gia vào tháng {service.startday.slice(3,5)} năm {service.startday.slice(6,10)}</div>
                    </div>
                </div>
                <div className="flex mt-4">
                    <div className="flex items-center mr-6">
                        <AiFillStar className="mr-2"/>
                        <span>438 đánh giá</span>
                    </div>
                    <div className="flex items-center">
                        <MdVerifiedUser className="mr-2"/>
                        <span>Đã xác minh danh tính</span>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
    </div> );
}

export default Room