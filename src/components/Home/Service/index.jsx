import Loader from '../../common/Loader';
import React, { Suspense, useEffect, useState } from 'react';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import serviceApi from '../../../api/serviceApi';
import imageApi from '../../../api/imageApi';
import style from './service.module.scss';
import classNames from 'classnames/bind';
import interestApi from '../../../api/interestApi';
import ServiceItem from './ServiceItem';
import { useRef } from 'react';
const cx = classNames.bind(style)


function Service({ typeService }) {
    const searchList = useSelector(state => state.searchReducer.service)
    const [interestList, setInterestList] = useState([])
    const loadRef = useRef()
    const showRef = useRef()

    useEffect(() => {
        // reset scroll
        window.scroll(0, 0);
    })

    // useEffect(() => {
    //     (async () => {
    //         const data = await interestApi.getAll()
    //         setInterestList([...data.data])
    //     })()
    // }, [])

    const [services, setService] = useState([])
    useEffect(() => {
        (async () => {
            const data = await serviceApi.getAll()
            loadRef.current && loadRef.current.classList.add("hidden")
            showRef.current && showRef.current.classList.remove("hidden")
            showRef.current && showRef.current.classList.add("grid")
            setService(data.data)
        })()
    }, [])
    return (<div className={`${cx('service')}`}>
        <div className="wrap">
            <div ref={loadRef}><Loader /></div>
            <div ref={showRef} className="grid-cols-4 min820max1195:grid-cols-3 hidden max819:grid-cols-2 ssm640:grid-cols-1 ">
                {
                    typeService === 'search' && searchList && searchList.length ?
                        searchList.map((item) => {
                            return <ServiceItem interestList={interestList} imageList={item.imagesCollection} serviceItem={item} key={item.id} id={item.id} typeService={item.type} name={item.name} phone={item.phone} star={item.star} address={item.address} />
                        })
                        :
                        services ? services.map(item => {
                            if (typeService === 'noibat') {
                                return <ServiceItem interestList={interestList} imageList={item.imagesCollection} serviceItem={item} key={item.id} id={item.id} typeService={item.type} name={item.name} phone={item.phone} star={item.star} address={item.address} />
                            }
                            else if (item.type === typeService) {
                                return <ServiceItem interestList={interestList} imageList={item.imagesCollection} serviceItem={item} key={item.id} id={item.id} typeService={item.type} name={item.name} phone={item.phone} star={item.star} address={item.address} />
                            }
                        }) : <div className="italic mt-[50%]">Danh sách địa điểm trống</div> }
            </div>
        </div>
    </div>);
}

export default memo(Service);