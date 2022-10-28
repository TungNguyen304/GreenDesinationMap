import Header from "../../../components/common/Header";
import Footer from "../../../components/common/Footer";
import { useValueContext } from "../../../hook";
import { useSelector } from "react-redux";
import { Suspense, useEffect, useState } from "react";
import serviceApi from "../../../api/serviceApi";
import { Link } from "react-router-dom";
import { AiOutlinePlus } from 'react-icons/ai'
import { IoSearchOutline } from 'react-icons/io5'
import React from "react";
import BigBox from "../../../components/Home/BigBox";
// import ServiceRow from "../../../components/common/ServiceRow";

import style from './management.module.scss'
import classNames from 'classnames/bind';
import imageApi from "../../../api/imageApi";
import Loader from "../../../components/common/Loader";
const cx = classNames.bind(style)

function Management({ title, type }) {
    const ServiceRow = React.lazy(async () => {
        return new Promise(resolve => setTimeout(resolve, 2000))
            .then(
                () => import('../../../components/common/ServiceRow')
            )
            .catch((error) => {
                console.log(error);
            })
    });
    const account = useSelector(state => state.accountReducer).supplier
    const [serviceList, setServiceList] = useState([])
    const [imageList, setImageList] = useState([])
    const value = useValueContext()
    const { handleDisplayBigBox } = value
    const show = useSelector(state => state.bigboxReducer.show)

    useEffect(() => {
        (async () => {
            const data = await imageApi.getAll()
            setImageList(data.data)
        })()
    }, [])

    useEffect(() => {
        (async () => {
            const data = await serviceApi.getAll()
            const list = data.data.filter((item) => {
                return item.userid === account.id
            })
            setServiceList([...list])
        })()
    }, [account.id])

    function handleFocus(event) {
        event.nativeEvent.path[1].style.border = '1px solid black'
    }

    function handleBlur(event) {
        event.nativeEvent.path[1].style.border = '1px solid #b0b0b0'
    }

    return (<div className={`${cx('management')}`}>
        <Header />
        <div className={`px-10 pt-10 ${cx('content')}`}>
            <div className="flex item-center justify-between">
                <div className="font-semibold text-xl">
                    {serviceList ? serviceList.length : 0} Địa điểm xanh
                </div>
                <Link to="/host/registerservice" className="flex items-center border border-solid border-black px-3 pt-[6px] pb-2 font-semibold rounded-md cursor-pointer hover:bg-[#F7F7F7]">
                    <AiOutlinePlus className="mt-[2px] mr-3" />
                    <span className="text-sm">Đăng ký địa điểm xanh</span>
                </Link>
            </div>
            <div className="flex justify-center">
                <div style={{ border: '1px solid #b0b0b0' }} className="flex items-center px-[10px] w-[30%] mt-2 py-1 bg-[#F7F7F7] rounded-full">
                    <IoSearchOutline />
                    <input onFocus={(e) => { handleFocus(e) }} onBlur={(e) => { handleBlur(e) }} type="text" className="w-full bg-inherit ml-2 placeholder:italic" placeholder="Tìm kiếm địa điểm xanh" />
                </div>
            </div>

            <div className="mt-5">
                <table className={`${cx('table')}`}>
                    <thead>
                        <tr>
                            <th style={{ flex: "2" }}>Địa điểm xanh</th>
                            <th>Trạng thái</th>
                            <th style={{ flex: "2" }}>Địa điểm</th>
                            <th>Đánh giá</th>
                            <th>Ngày đăng ký</th>
                            <th>Ngày được duyệt </th>
                            <th>Quản lý</th>
                        </tr>
                    </thead>
                    <Suspense fallback={<Loader />}>
                        <tbody>
                            {serviceList && serviceList.map((item) => {
                                return <ServiceRow imageList={imageList} key={item.id} item={item} />
                            })}

                        </tbody>
                    </Suspense>
                </table>
            </div>

        </div>
        {show && <div>
            <BigBox title={title} type={type} handleDisplayBigBox={handleDisplayBigBox} />
        </div>}
        <Footer />
    </div>);
}

export default Management;