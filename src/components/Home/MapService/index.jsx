import Map from '../../common/Map';
import style from './mapservice.module.scss'
import React from 'react';
import {MdArrowBack} from 'react-icons/md'
import {HiDotsHorizontal} from 'react-icons/hi'
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import serviceApi from '../../../api/serviceApi';
import Loader from '../../common/Loader';
import { Suspense } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
const cx = classNames.bind(style)

function MapService(props) {
    const navigate = useNavigate()
    let serviceListElement
    const isDetailWishListPage = window.location.pathname.includes('/detailwishlist')
    const ServiceItem = React.lazy(async() => {
        return new Promise(resolve => setTimeout(resolve, 2000))
        .then(
            () => import('../Service/ServiceItem')
        )
        .catch((error) => {
            console.log(error);
        })
    });
    useEffect(() => {
        setTimeout(() => {
            serviceListElement = document.querySelector(`.${style.wrap_list}`)
            serviceListElement && serviceListElement.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        }, 2300)
    })

    const [serviceList, setServiceList] = useState()
    useEffect(() => {
        (async() => {
            const data = await serviceApi.getAll()
            setServiceList(data.data)
        })()
    }, [])

    function handleNavigateWishList() {
        navigate('/wishlist')
    }

    return ( <div style={{marginTop: `${isDetailWishListPage ? '' : 'calc(var(--height_header) + var(--height_navbar) + 30px)'}`}} className={`${cx('map_service')}`}>
        <div className={`${isDetailWishListPage ? 'h-[88vh]' : 'wrap h-[67vh]'} `}>
            <div className="grid grid-cols-4 h-full">
                <div className={`${isDetailWishListPage ? 'h-[88vh]' : 'h-[67vh]'}`}>
                    {isDetailWishListPage && <div className='flex items-center justify-between px-5 py-3 text-2xl font-semibold'>
                        <div className='flex items-center'>
                            <div onClick={handleNavigateWishList} className='hover:bg-slate-50 active:scale-[0.9] rounded-full p-3 cursor-pointer'><MdArrowBack /></div>
                            <span className='ml-5 text-3xl font-semibold'>Perfect</span>
                        </div>
                        <div>
                            <div className='hover:bg-slate-50 rounded-full p-3 cursor-pointer'><HiDotsHorizontal/></div>
                        </div>
                    </div>}
                    <div className={`${isDetailWishListPage ? '' : 'h-full'}`}>
                        <Suspense fallback={<Loader/>}>
                            <div className={`${isDetailWishListPage ? 'h-[78vh]' : 'h-full'} ${cx('wrap_list')}`}>
                                <div className='flex flex-col items-center mt-[10px]'>
                                    {isDetailWishListPage ?
                                    props.positionList.map((item, index) => {
                                        return <ServiceItem key={index} id={item.id} name={item.name} phone={item.phone} address={item.address} star={item.star} typeService={item.type} serviceItem={item}/>
                                    })  
                                    : 
                                    serviceList && serviceList.map((item, index) => {
                                        if(props.typeService === "noibat") {
                                            return <ServiceItem key={index} id={item.id} name={item.name} phone={item.phone} address={item.address} star={item.star} typeService={item.type} serviceItem={item}/>
                                        }
                                        else if(props.typeService === item.type) {
                                            return <ServiceItem key={index} id={item.id} name={item.name} phone={item.phone} address={item.address} star={item.star} typeService={item.type} serviceItem={item}/>
                                        }
                                    })}
                                </div>
                            </div>
                        </Suspense>
                    </div>
                </div>
                <div className="col-span-3">
                    <Map positionList={serviceList} {...props}/>
                </div>
            </div>
        </div>
    </div> );
}

export default React.memo(MapService);