import Map from '../../common/Map';
import style from './mapservice.module.scss'
import React, { useRef } from 'react';
import {MdArrowBack} from 'react-icons/md'
import {HiDotsHorizontal} from 'react-icons/hi'
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import serviceApi from '../../../api/serviceApi';
import Loader from '../../common/Loader';
import { useValueContext } from '../../../hook';
import ServiceItem from '../Service/ServiceItem';
import { useEffect } from 'react';
import { useState } from 'react';
const cx = classNames.bind(style)

function MapService({ isWishList, ...props }) {
    const loadRef = useRef()
    const showRef = useRef()
    const { handleSetBigBox, handleDisplayBigBox } = useValueContext()
    let serviceListElement
    const isDetailWishListPage = window.location.pathname.includes('/detailwishlist')
    const searchList = useSelector(state => state.searchReducer.service)
    useEffect(() => {
        setTimeout(() => {
            serviceListElement = document.querySelector(`.${style.wrap_list}`)
            serviceListElement && serviceListElement.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        }, 2300)
    }, [])

    // useEffect(() => {
    //     (async () => {
    //         const data = await interestApi.getAll()
    //         setInterestList([...data.data])
    //     })()
    // }, [])

    const [serviceList, setServiceList] = useState()
    useEffect(() => {
        !isWishList && (async() => {
            const data = await serviceApi.getGreenService()
            console.log(data);
            loadRef.current && loadRef.current.classList.add("hidden")
            showRef.current && showRef.current.classList.remove("hidden")
            if(data && data.data.length > 0) {
                setServiceList(data.data)
            }
        })()
    }, [])

    
    return ( <div style={{marginTop: `${isDetailWishListPage ? '' : 'calc(var(--height_header) + var(--height_navbar) + 20px)'}`}} className={`${cx('map_service')}`}>
        <div className={`${cx('container')} ${isDetailWishListPage ? 'h-[88vh]' : 'wrap pt-[30px]'} `}>
            <div className="grid slg1250:grid-cols-4 h-full">
                <div className={`${cx('list_service')} ${isDetailWishListPage ? 'h-[88vh]' : ''} hidden slg1250:block`}>
                    {isDetailWishListPage && <div className='flex items-center justify-between px-5 py-3 text-2xl font-semibold'>
                        <div className='flex items-center'>
                            <Link to='/wishlist' className='hover:bg-slate-50 active:scale-[0.9] rounded-full p-3 cursor-pointer'><MdArrowBack /></Link>
                            <span className='ml-5 text-3xl font-semibold'>Perfect</span>
                        </div>
                        <div>
                            <div onClick={() => {
                                console.log(1);
                                handleSetBigBox('Tùy chọn', 'optionInterest')
                                handleDisplayBigBox()
                            }} className='hover:bg-slate-50 rounded-full p-3 cursor-pointer'><HiDotsHorizontal/></div>
                        </div>
                    </div>}
                    <div className={`h-full relative`}>
                        {!isWishList && <div ref={loadRef}>
                            <Loader/>
                        </div>}
                        <div ref={showRef} className={`${isDetailWishListPage ? 'h-[78vh]' : 'h-full hidden'} ${cx('wrap_list')}`}>
                            <div className={`flex flex-col items-center mt-[10px] ${isDetailWishListPage ? '' : ''}`}>
                                {
                                isDetailWishListPage ?
                                props.positionList && props.positionList.map((item, index) => {
                                    return <ServiceItem imageList={item.imagesCollection} wishList={item.wishList} key={index} id={item.id} name={item.name} phone={item.phone} address={item.address} star={item.star} typeService={item.type} serviceItem={item}/>
                                })  
                                : props.typeService==='search' && searchList && searchList.length>0 ? searchList.map((item, index) => {
                                    return <ServiceItem imageList={item.imagesCollection} wishList={item.wishList} key={index} id={item.id} name={item.name} phone={item.phone} address={item.address} star={item.star} typeService={item.type} serviceItem={item}/>
                                })
                                : serviceList && serviceList.length > 0 && serviceList.map((item, index) => {
                                    if(props.typeService === "noibat") {
                                        return <ServiceItem imageList={item.imagesCollection} wishList={item.wishList} key={index} id={item.id} name={item.name} phone={item.phone} address={item.address} star={item.star} typeService={item.type} serviceItem={item}/>
                                    }
                                    else if(props.typeService === item.type) {
                                        return <ServiceItem imageList={item.imagesCollection} wishList={item.wishList} key={index} id={item.id} name={item.name} phone={item.phone} address={item.address} star={item.star} typeService={item.type} serviceItem={item}/>
                                    }
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="slg1250:col-span-3 w-full ssm640:w-[100vw]">
                    <Map positionList={props.typeService==='search' ? searchList : serviceList} {...props}/>
                </div>
            </div>
        </div>
    </div> );
}

export default React.memo(MapService);