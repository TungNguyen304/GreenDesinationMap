import Header from "../../../components/common/Header";
import Footer from "../../../components/common/Footer";
import { useValueContext } from "../../../hook";
import { useSelector } from "react-redux";
import { Suspense, useEffect, useState } from "react";
import { GrUpdate } from 'react-icons/gr'
import { RiDeleteBin5Fill } from 'react-icons/ri'
import serviceApi from "../../../api/serviceApi";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlinePlus } from 'react-icons/ai'
import { IoSearchOutline } from 'react-icons/io5'
import React from "react";
import BigBox from "../../../components/Home/BigBox";
import style from './management.module.scss'
import classNames from 'classnames/bind';
import Loader from "../../../components/common/Loader";
import { useCallback, useRef } from "react";
import FloatBox from "../../../components/common/FloatBox";
import BigLoader from "../../../components/common/BigLoader";
import imageApi from "../../../api/imageApi";
import placeFirebase from "../../../firebase/place";
const cx = classNames.bind(style)

function Management({ title, type }) {
    const loadRef = useRef()
    const ServiceRow = React.lazy(async () => {
        return new Promise(resolve => setTimeout(resolve, 2000))
            .then(
                () => import('../../../components/common/ServiceRow')
            )
            .catch((error) => {
                console.log(error);
            })
    });

    const ServiceItem = React.lazy(async () => {
        return new Promise(resolve => setTimeout(resolve, 2000))
            .then(
                () => import('../../../components/Home/Service/ServiceItem')
            )
            .catch((error) => {
                console.log(error);
            })
    });

    const account = useSelector(state => state.accountReducer).supplier
    const [serviceList, setServiceList] = useState([])
    const value = useValueContext()
    const { handleDisplayBigBox } = value
    const show = useSelector(state => state.bigboxReducer.show)

    useEffect(() => {
        account.id && (async () => {
            const data = await serviceApi.getByUserId(account.id)
            .catch((err) => {})
            loadRef.current && loadRef.current.classList.add("hidden")
            data && setServiceList([...data.data])
        })()
    }, [account.id])

    function handleFocus(event) {
        event.nativeEvent.path[1].style.border = '1px solid black'
    }

    function handleBlur(event) {
        event.nativeEvent.path[1].style.border = '1px solid #b0b0b0'
    }

    const handleDelete = useCallback(async (event) => {
        loadRef.current.classList.remove("hidden")
        console.log(event.target.dataset.placeid);
        setServiceList(serviceList.filter((item) => item.id!==Number(event.target.dataset.placeid)))
        const data = await imageApi.get(event.target.dataset.placeid)
        data.data.forEach((item) => {
            placeFirebase.delete(item.key)
        })
        serviceApi.delete(event.target.dataset.placeid)
        .then(() => {
            alert("Delete success!")
            loadRef.current.classList.add("hidden")
        })
        .catch(() => {
            alert("Delete failed!")
        })
        
        event.stopPropagation()
    })

    return (<div className={`${cx('management')}`}>
        <Header />
        <div className={`px-10 pt-10 ${cx('content')}`}>
            <div className="flex item-center justify-between max477:flex-col">
                <div className="font-semibold text-xl max477:text-center">
                    {serviceList ? serviceList.length : 0} Địa điểm xanh
                </div>
                <Link to="/host/registerservice" className="flex items-center border border-solid border-black px-3 pt-[6px] pb-2 font-semibold rounded-md cursor-pointer hover:bg-[#F7F7F7]">
                    <AiOutlinePlus className="mt-[2px] mr-3" />
                    <span className="text-sm">Đăng ký địa điểm xanh</span>
                </Link>
            </div>
            <div className="flex justify-center">
                <div style={{ border: '1px solid #b0b0b0' }} className="flex items-center px-[10px] w-[30%] ssm767:w-full mt-2 py-1 bg-[#F7F7F7] rounded-full">
                    <IoSearchOutline />
                    <input onFocus={(e) => { handleFocus(e) }} onBlur={(e) => { handleBlur(e) }} type="text" className="w-full bg-inherit ml-2 placeholder:italic" placeholder="Tìm kiếm địa điểm xanh" />
                </div>
            </div>

            <div className="mt-5 slg1250:mb-[80px]">
                <table className={`${cx('table')} lg:block hidden`}>
                    <thead>
                        <tr>
                            <th style={{ flex: "3" }}>Địa điểm xanh</th>
                            <th>Trạng thái</th>
                            <th style={{ flex: "3" }}>Địa điểm</th>
                            <th>Đánh giá</th>
                            <th>Ngày đăng ký</th>
                            <th>Ngày được duyệt </th>
                            <th>Quản lý</th>
                        </tr>
                    </thead>
                    <Suspense fallback={<Loader />}>
                        <tbody>
                            {serviceList && serviceList.map((item) => {
                                return <ServiceRow imageList={item.imagesCollection} handleDelete={handleDelete} key={item.id} place={JSON.stringify(item)} />
                            })}

                        </tbody>
                    </Suspense>
                </table>

                <div>
                    <div className="grid grid-cols-3 lg:hidden max819:grid-cols-2 ssm640:grid-cols-1">
                        <Suspense fallback={<Loader />}>
                            {serviceList && serviceList.map((item) => {
                                return <div key={item.id} className="flex flex-col items-center">
                                    <ServiceItem serviceItem={item} imageList={item.imagesCollection} key={item.id} id={item.id} typeService={item.type} name={item.name} phone={item.phone} star={item.star} address={item.address} />
                                    <div className="flex justify-center mb-[40px]">
                                        <button className='px-3 py-2 hover:brightness-90 active:scale-95 rounded-lg mr-2 bg-green-400'><GrUpdate /></button>
                                        <button data-placeid={item.id} onClick={(e) => handleDelete(e)} className='px-3 py-2 hover:brightness-90 active:scale-95 rounded-lg bg-red-600'><RiDeleteBin5Fill className="pointer-events-none"/></button>
                                    </div>
                                </div>
                            })}
                        </Suspense>
                    </div>
                </div>
            </div>

        </div>
        {show && <div>
            <BigBox title={title} type={type} handleDisplayBigBox={handleDisplayBigBox} />
        </div>}
        <Footer />
        <div ref={loadRef} className="">
            <BigLoader/>
        </div>

        <div><FloatBox/></div>
    </div>);
}

export default React.memo(Management);