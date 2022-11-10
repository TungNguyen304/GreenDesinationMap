import Loader from '../../common/Loader';
import React, { Suspense, useEffect, useState } from 'react';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import serviceApi from '../../../api/serviceApi';
import imageApi from '../../../api/imageApi';
import style from './service.module.scss';
import classNames from 'classnames/bind';
import interestApi from '../../../api/interestApi';
const cx = classNames.bind(style)


function Service({typeService}) {
    const searchList = useSelector(state => state.searchReducer.service)
    const [imageList, setImageList] = useState([])
    const [interestList, setInterestList] = useState([])
    const ServiceItem = React.lazy(async() => {
        return new Promise(resolve => setTimeout(resolve, 2000))
        .then(
            () => import('./ServiceItem')
        )
        .catch((error) => {
            console.log(error);
        })
    });
    
    useEffect(() => {
        // reset scroll
        window.scroll(0, 0);
    })

    useEffect(() => {
        (async () => {
            const data = await imageApi.getAll()
            setImageList([...data.data])
        })()
    }, [])

    useEffect(() => {
        (async () => {
            const data = await interestApi.getAll()
            setInterestList([...data.data])
        })()
    }, [])
    
    const [services, setService] = useState([])
    useEffect(() => {
        (async() => {
            const data = await serviceApi.getAll()
            console.log(data.data);
            setService(data.data)
        })()
    }, [])
    return ( <div className={`${cx('service')}`}>
            <div className="wrap">
                <Suspense fallback={<Loader/>}>
                    <div className="grid grid-cols-4 min820max1195:grid-cols-3 max819:grid-cols-2 ssm640:grid-cols-1 ">
                        {
                        typeService==='search' && searchList && searchList.length ? 
                        searchList.map((item) => {
                            return <ServiceItem imageList={imageList} interestList={interestList} serviceItem={item} key={item.id} id={item.id} typeService={item.type} name={item.name} phone={item.phone} star={item.star} address={item.address}/>
                        })
                        :
                        services && services.map(item => {
                            if(typeService ==='noibat') {
                                return <ServiceItem imageList={imageList} interestList={interestList} serviceItem={item} key={item.id} id={item.id} typeService={item.type} name={item.name} phone={item.phone} star={item.star} address={item.address}/>
                            }
                            else if(item.type === typeService) {
                                return <ServiceItem imageList={imageList} interestList={interestList} serviceItem={item} key={item.id} id={item.id} typeService={item.type} name={item.name} phone={item.phone} star={item.star} address={item.address}/>
                            }
                        })}
                    </div>
                </Suspense>
            </div>
    </div> );
}

export default memo(Service);