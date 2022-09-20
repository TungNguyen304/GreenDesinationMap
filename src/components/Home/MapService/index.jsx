import Map from '../../common/Map';
import style from './mapservice.module.scss'
import React from 'react';
import classNames from 'classnames/bind';
import Scroll from 'react-scroll'
import {Element} from 'react-scroll'
import serviceApi from '../../../api/serviceApi';
import Loader from '../../common/Loader';
import { Suspense } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
const cx = classNames.bind(style)

function MapService(props) {
    let serviceListElement
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
            serviceListElement.scrollTo({
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
    return ( <div className={`${cx('map_service')}`}>
        <div className="wrap h-[67vh]">
            <div className="grid grid-cols-4 h-full">
                <Suspense fallback={<Loader/>}>
                    <div className={`h-full ${cx('wrap_list')}`}>
                        <div className='flex flex-col items-center mt-[10px]'>
                            {serviceList && serviceList.map((item, index) => {
                                if(props.typeService === "noibat") {
                                    return <ServiceItem key={index} img={item.images} name={item.name} phone={item.phone} address={item.address} star={item.star} typeService={item.type} serviceItem={item}/>
                                }
                                else if(props.typeService === item.type) {
                                    return <ServiceItem key={index} img={item.images} name={item.name} phone={item.phone} address={item.address} star={item.star} typeService={item.type} serviceItem={item}/>
                                }
                            })}
                        </div>
                    </div>
                </Suspense>
                <div className="col-span-3">
                    <Map default={true} {...props}/>
                </div>
            </div>
        </div>
    </div> );
}

export default React.memo(MapService);