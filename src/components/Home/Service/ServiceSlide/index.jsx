import { forwardRef, useImperativeHandle, useRef } from 'react';
import { useSelector } from 'react-redux';
import React from 'react';
import imageApi from '../../../../api/imageApi';
import style from './serviceslide.module.scss'
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useState } from 'react';
const cx = classNames.bind(style)

function ServiceSlide({typeComponent, id, imageList}, ref) {
    const isPreviewPage = window.location.pathname.includes('/preview')
    const homePage = useSelector(state => state.homePageReducer.type)
    const imgRef = useRef()
    let clnImg

    if(homePage === "map") {
        clnImg = "w-[280px] h-[260px]"
    }
    else
        clnImg = "w-[320px] h-[300px]"

    useImperativeHandle(ref, () => {
        return { 
            getImg: () => {
                return imgRef.current.children
            }
        }
    })

    return ( <div className={`relative rounded-xl ${typeComponent === "map" ? 'w-[200px] h-[180px]' : homePage === "map" ? "w-[280px] h-[240px]" : "w-[320px] h-[300px]"}  overflow-hidden`}>
        <div ref={imgRef} className={`flex absolute`}>
            {imageList && imageList.map((item, index) => {
                if(item.placeid === id)
                {
                    return (<div key={index} ref={ref} className={`${cx('img')} overflow-hidden ${typeComponent === "map" ? 'w-[200px] h-[180px]' : homePage === "map" ? "w-[280px] h-[240px]" : "w-[320px] h-[320px]"} flex justify-center`}>
                        <img className={`${clnImg} object-cover`} src={isPreviewPage ? item.path : item.name} alt="" />
                    </div>)
                }
            })}
        </div>
    </div> );
}

export default React.memo(forwardRef(ServiceSlide));