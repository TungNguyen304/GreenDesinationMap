import { forwardRef, useImperativeHandle, useRef } from 'react';
import { BsHeartFill } from 'react-icons/bs'
import { useSelector } from 'react-redux';
import Left from '../../../common/Left'
import Right from '../../../common/Right'
import React, { useEffect } from 'react';
import style from './serviceslide.module.scss'
import classNames from 'classnames/bind';
const cx = classNames.bind(style)

function ServiceSlide({ typeComponent, id, imageList, type, previewPage, isInterest, handleLike, hidden, imgList }, ref) {
    const left = useRef()
    const right = useRef()

    if (type === "marker") {
        imageList = [...imageList.filter((item) => {
            return item.placeid === id
        })]
        console.log(imageList);
    }

    const isPreviewPage = window.location.pathname.includes('/preview')
    console.log(isPreviewPage);
    const homePage = useSelector(state => state.homePageReducer.type)
    const imgRef = useRef()
    let clnImg

    if (homePage === "map") {
        clnImg = "w-[280px] h-[260px]"
    }
    else
        clnImg = "w-[320px] h-[300px]"

    useEffect(() => {
        if (left.current) {
            left.current.addEventListener('click', handleSlideLeft)
            right.current.addEventListener('click', handleSlideRight)
        }
    })

    function handleSlideRight() {
        let width = imgList && Number((window.getComputedStyle(imgList[0]).width).slice(0, (window.getComputedStyle(imgList[0]).width).length - 2))
        let sum = width
        let marginLeft = imgList && (Number((window.getComputedStyle(imgList[0]).marginLeft).slice(0, (window.getComputedStyle(imgList[0]).marginLeft).length - 2)))
        if (imgList && marginLeft !== -(imgList.length - 1) * (sum / 1)) {
            if (marginLeft === 0) {
                imgList[0].style.marginLeft = `${-sum}px`
            }
            else {
                imgList[0].style.marginLeft = String(marginLeft - sum) + 'px'
            }
        }
        else {
            if (imgList)
                imgList[0].style.marginLeft = `0px`
        }

        right.current.removeEventListener('click', handleSlideRight)
        setTimeout(() => {
            right.current.addEventListener('click', handleSlideRight)
        }, 400)
    }

    function handleSlideLeft() {
        let width = imgList && Number((window.getComputedStyle(imgList[0]).width).slice(0, (window.getComputedStyle(imgList[0]).width).length - 2))
        let sum = width
        let marginLeft = imgList && (Number((window.getComputedStyle(imgList[0]).marginLeft).slice(0, (window.getComputedStyle(imgList[0]).marginLeft).length - 2)))
        if (marginLeft !== 0) {
            imgList[0].style.marginLeft = `${marginLeft + sum}px`
        }
        else {
            imgList[0].style.marginLeft = `${-(imgList.length - 1) * (sum / 1)}px`
        }

        left.current.removeEventListener('click', handleSlideLeft)
        setTimeout(() => {
            left.current.addEventListener('click', handleSlideLeft)
        }, 400)
    }

    useImperativeHandle(ref, () => {
        return {
            getImg: () => {
                return imgRef.current.children
            }
        }
    })



    return (<div className={`relative rounded-xl ${typeComponent === "map" ? 'w-[200px] h-[180px]' : homePage === "map" ? "w-[280px] h-[240px]" : "w-[320px] h-[300px]"} relative overflow-hidden`}>
        {!previewPage && <BsHeartFill style={{ 'fill': `${isInterest ? 'var(--color_heart)' : 'rgba(0, 0, 0, 0.6)'}`, 'stroke': 'white', 'strokeWidth': '1px' }} onClick={(e) => handleLike(e)} className={`text-base z-[1] w-[30px] h-[24px] absolute top-3 right-3 select-none active:scale-[0.8]`} />}
        <div ref={imgRef} className={`flex absolute z-[0]`}>
            {imageList && imageList.map((item, index) => {
                if (item.placeid === id) {
                    return (<div key={index} ref={ref} className={`${cx('img')} overflow-hidden ${typeComponent === "map" ? 'w-[200px] h-[180px]' : homePage === "map" ? "w-[280px] h-[240px]" : "w-[320px] h-[320px]"} flex justify-center`}>
                        <img className={`${clnImg} object-cover`} src={isPreviewPage ? item.file : item.name} alt="" />
                    </div>)
                }
            })}
        </div>
        <Left ref={left} className={hidden && 'hidden'} />
        <Right ref={right} className={hidden && 'hidden'} />
    </div>);
}

export default React.memo(forwardRef(ServiceSlide));