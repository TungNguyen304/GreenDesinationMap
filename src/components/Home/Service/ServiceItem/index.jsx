import { useEffect, useRef, useState } from "react";
import { BsHeartFill } from 'react-icons/bs'
import { FaStar } from 'react-icons/fa'
import { useDispatch } from "react-redux";
import { setService } from '../../../../store/actions/service'
import { useValueContext } from '../../../../hook'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Left from '../../../common/Left'
import Right from '../../../common/Right'
import interestApi from "../../../../api/interestApi";
import ServiceSlide from "../ServiceSlide";
import style from './serviceitem.module.scss'
import classNames from 'classnames/bind';
const cx = classNames.bind(style)

function ServiceItem({name, phone, address, star, typeService, serviceItem, typeComponent, id}) {
    const value = useValueContext()
    const dispatch = useDispatch()
    const [hidden, setHidden] = useState(true)
    const [isInterest, setIsInterest] = useState(false)
    const account = JSON.parse(localStorage.getItem('account'))
    const imgRef = useRef()
    const left = useRef()
    const right = useRef()
    const navigate = useNavigate()
    const homePage = useSelector(state => state.homePageReducer.type)
    const [imgList, setImgList] = useState() ;
    
    
    useEffect(() => {
        left.current.addEventListener('click', handleSlideLeft)
        right.current.addEventListener('click', handleSlideRight)
        
    })
    
    useEffect(() => {
        let imgs = imgRef.current.getImg()
        setImgList(imgs)
    }, [])

    useEffect(() => {
        (async() => {
            const data = await interestApi.getAll()
            data.data.forEach((item) => {
                if(item.placeid === id && account && item.userid === account.id) {
                    setIsInterest(true)
                }
            })
        })()
    }, [])

    function handelHidden() {
        setHidden(true)
    }

    function handelDisplay() {
        setHidden(false)
    }

    function handleSlideRight() {
        let width = imgList && Number((window.getComputedStyle(imgList[0]).width).slice(0, (window.getComputedStyle(imgList[0]).width).length-2))
        let sum = width
        let marginLeft = imgList && (Number((window.getComputedStyle(imgList[0]).marginLeft).slice(0, (window.getComputedStyle(imgList[0]).marginLeft).length-2)))
        if(imgList && marginLeft !== -(imgList.length-1)*(sum/1)) {
            if(marginLeft === 0) {
                imgList[0].style.marginLeft = `${-sum}px`
            }
            else {
                imgList[0].style.marginLeft = String(marginLeft - sum) + 'px'
            }
        }
        else {
            if(imgList)
                imgList[0].style.marginLeft = `0px`
        }

        right.current.removeEventListener('click', handleSlideRight)
        setTimeout(() => {
            right.current.addEventListener('click', handleSlideRight)
        }, 400)
    }

    function handleSlideLeft() {
        let width = imgList && Number((window.getComputedStyle(imgList[0]).width).slice(0, (window.getComputedStyle(imgList[0]).width).length-2))
        let sum = width
        let marginLeft = imgList && (Number((window.getComputedStyle(imgList[0]).marginLeft).slice(0, (window.getComputedStyle(imgList[0]).marginLeft).length-2)))
        if(marginLeft !== 0) {
            imgList[0].style.marginLeft = `${marginLeft + sum}px`
        }
        else {
            imgList[0].style.marginLeft = `${-(imgList.length-1)*(sum/1)}px`
        }

        left.current.removeEventListener('click', handleSlideLeft)
        setTimeout(() => {
            left.current.addEventListener('click', handleSlideLeft)
        }, 400)
    }

    function handleLike(even) {
        even.stopPropagation()
        if(localStorage.getItem('account')) {
            if(even.target.farthestViewportElement.style.fill !== 'var(--color_heart)'){
                value.handleSetBigBox('Danh sách yêu thích của bạn', 'interests')
                value.handleDisplayBigBox()
                // even.target.style.fill = 'var(--color_heart)'
            }
            else
            {
                even.target.farthestViewportElement.style.fill = 'rgba(0, 0, 0, 0.6)'
            }
        }
        else {
            value.handleSetBigBox('Chào mừng bạn đến với GreenMap', 'login')
            value.handleDisplayBigBox()
        }
    }

    function handleNavigateToRoom() {
        dispatch(setService(serviceItem))
        localStorage.setItem('service', JSON.stringify(serviceItem))
        navigate('/room')
    }


    return ( <div onMouseOver={handelDisplay} onMouseLeave={handelHidden} onClick={handleNavigateToRoom} className={`${cx('service_item')} ${typeComponent === "map" ? 'w-[200px] mx-auto' : homePage === "map" ? "hover:scale-1 w-[90%] hover:shadow-normal mb-[40px] px-[13px] pt-[13px] pb-[4px]" : "hover:scale-[1.01] hover:shadow-normal mb-[40px] px-[13px] pt-[13px] pb-[4px]"} cursor-pointer`}>
        <div className={`relative mb-3 flex justify-center`}>
            <ServiceSlide ref={imgRef} typeComponent={typeComponent} id={id}/>
            <BsHeartFill style={{'fill': `${isInterest ? 'var(--color_heart)' : 'rgba(0, 0, 0, 0.6)'}`, 'stroke': 'white', 'strokeWidth': '1px'}} onClick={(e) => handleLike(e)} className={`absolute text-base w-[30px] h-[24px] top-3 right-3 select-none active:scale-[0.8]`}/>
            <Left ref={left} className={hidden && 'hidden'}/>
            <Right ref={right} className={hidden && 'hidden'}/>
        </div>
        <div className="flex justify-between">
            <span className={`oneline font-semibold text-lg text-[#222222]`}>{name}</span>
            <span className="flex items-center">
                <FaStar className="mr-2"/> {star}
            </span>
        </div>
        <div className="oneline text-base text-[#717171]">{address}</div>
        <div className="text-[#717171]">
            {phone}
        </div>
        <div className="text-[#717171]">
            <span>Service type: </span> {typeService}
        </div>

    </div> );
}

export default ServiceItem;