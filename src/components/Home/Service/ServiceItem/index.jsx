import { useEffect, useRef, useState } from "react";
import { FaStar } from 'react-icons/fa'
import { useDispatch } from "react-redux";
import { setService } from '../../../../store/actions/service'
import { useValueContext } from '../../../../hook'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import imageApi from "../../../../api/imageApi";
import ServiceSlide from "../ServiceSlide";
import style from './serviceitem.module.scss'
import classNames from 'classnames/bind';
const cx = classNames.bind(style)

function ServiceItem({ name, phone, address, imageListTemp, star, typeService, serviceItem, type, typeComponent, id, interestList, previewPage }) {
    const isPreviewPage = sessionStorage.getItem('placeTemporary') ? true : false
    const isManagementPage = window.location.pathname.includes('/management')
    const value = useValueContext()
    const dispatch = useDispatch()
    const [hidden, setHidden] = useState(true)
    const [imageList, setImageList] = useState([])
    const [isInterest, setIsInterest] = useState(false)
    const account = useSelector(state => state.accountReducer).user
    const imgRef = useRef()
    
    const navigate = useNavigate()
    const homePage = useSelector(state => state.homePageReducer.type)
    const [imgList, setImgList] = useState()

    useEffect(() => {
        if (imgRef.current) {
            let imgs = imgRef.current.getImg()
            setImgList(imgs)
        }
    }, [])

    useEffect(() => {
        (async () => {
            interestList && interestList.forEach((item) => {
                if (item.placeid === id && account && item.userid === account.id) {
                    setIsInterest(true)
                }
            })
        })()
    }, [account, id, interestList])
    
    useEffect(() => {
        (async () => {
            if(previewPage) {
                setImageList(imageListTemp)
            } else {
                const data = await imageApi.get(id)
                setImageList(data.data);
            }
        })()
    }, [previewPage, imageListTemp])

    function handelHidden() {
        setHidden(true)
    }

    function handelDisplay() {
        setHidden(false)
    }

    function handleLike(even) {
        even.stopPropagation()
        if (account) {
            if (even.target.farthestViewportElement.style.fill !== 'var(--color_heart)') {
                value.handleSetBigBox('Danh sách yêu thích của bạn', 'interests')
                value.handleDisplayBigBox()
                // even.target.style.fill = 'var(--color_heart)'
            }
            else {
                even.target.farthestViewportElement.style.fill = 'rgba(0, 0, 0, 0.6)'
            }
        }
        else {
            value.handleSetBigBox('Chào mừng bạn đến với GreenMap', 'login')
            value.handleDisplayBigBox()
        }
    }

    function handleNavigateToRoom() {
        if (isPreviewPage) {
            navigate(`/room/temporary`)
        }
        else {
            dispatch(setService(serviceItem))
            localStorage.setItem('service', JSON.stringify(serviceItem))
            navigate(`/room/${id}`)
        }
    }


    return (<div onMouseOver={handelDisplay} onMouseLeave={handelHidden} onClick={handleNavigateToRoom} className={`${cx('service_item')} ${typeComponent === "map" ? 'w-[200px] mx-auto' : homePage === "map" ? `hover:scale-1 ${isPreviewPage?'w-[280px]':'w-[90%]'} hover:shadow-normal ${isManagementPage ? '' : 'mb-[40px]'} px-[13px] pt-[13px] pb-[4px]` : "hover:scale-[1.01] hover:shadow-normal mb-[40px] px-[13px] pt-[13px] pb-[4px]"} ${previewPage && 'border-2 border-solid border-[#4c4949]'} flex flex-col justify-center cursor-pointer`}>
        <div className={`relative mb-3 flex justify-center`}>
            <ServiceSlide imgList={imgList} hidden={hidden} previewPage={previewPage} handleLike={handleLike} isInterest={isInterest}  ref={imgRef} imageList={imageList} type={type} typeComponent={typeComponent} id={id} />
        </div>
        <div className={`max1380:flex max1380:flex-col max1380:items-center`}>
            <div className="flex justify-between">
                <span className={`oneline font-semibold text-lg text-[#222222]`}>{name}</span>
                <span className="flex items-center ml-3">
                    <FaStar className="mr-2 text-yellow-600" /> {star}
                </span>
            </div>
            <div title={address} className="oneline text-base text-[#717171]">{address}</div>
            <div className="text-[#717171]">
                {phone}
            </div>
            <div className="text-[#717171]">
                <span>Service type: </span> {typeService}
            </div>
        </div>

    </div>);
}

export default ServiceItem;