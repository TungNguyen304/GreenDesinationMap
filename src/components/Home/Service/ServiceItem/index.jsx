import { useEffect, useRef, useState, memo } from "react";
import { FaStar } from 'react-icons/fa'
import { useDispatch } from "react-redux";
import { setService } from '../../../../store/actions/service'
import { useValueContext } from '../../../../hook'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { setServiceIdInterest } from "../../../../store/actions/service";
import ServiceSlide from "../ServiceSlide";
import style from './serviceitem.module.scss'
import classNames from 'classnames/bind';
import interestApi from "../../../../api/interestApi";
const cx = classNames.bind(style)

function ServiceItem({ imageList, name, phone, address, imageListTemp, star, typeService, serviceItem, type, typeComponent, id, previewPage, wishList }) {
    const isPreviewPage = sessionStorage.getItem('placeTemporary') ? true : false
    const isManagementPage = window.location.pathname.includes('/management')
    const value = useValueContext()
    const dispatch = useDispatch()
    const [hidden, setHidden] = useState(true)
    const [isInterest, setIsInterest] = useState({
        state: false,
        id: null
    })
    const account = useSelector(state => state.accountReducer.user)
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
        console.log(wishList);
        wishList && (async () => {
            let id
            const check = wishList.some((item) => {
                id = item.id
                return item.userid === account.id
            })
            setIsInterest({
                state: check,
                id: id
            })
        })()
    }, [account.id, wishList])

    function handelHidden() {
        setHidden(true)
    }

    function handelDisplay() {
        setHidden(false)
    }

    function handleLike(even) {
        even.stopPropagation()
        if (account && account.id && even.target.farthestViewportElement) {
            if (even.target.farthestViewportElement.style.fill !== 'var(--color_heart)') {
                dispatch(setServiceIdInterest({
                    id: id,
                    heartRef: even.target
                }))
                value.handleSetBigBox('Danh sách yêu thích của bạn', 'interests')
                value.handleDisplayBigBox()
            }
            else {
                even.target.farthestViewportElement.style.fill = 'rgba(0, 0, 0, 0.6)'
                interestApi.deleteInterestPlace(Number(isInterest.id))
            }
        }
        else {
            value.handleSetBigBox('Chào mừng bạn đến với GreenMap', 'login')
            value.handleDisplayBigBox()
        }
    }

    function handleNavigateToRoom() {
        if (isPreviewPage) {
            navigate(`/host/management/room/temporary`)
        } else if(isManagementPage) {
            window.open(`/host/management/room/${id}`,'_blank')
        }
        else {
            dispatch(setService(serviceItem))
            localStorage.setItem('service', JSON.stringify(serviceItem))
            window.open(`/room/${id}`,'_blank')
        }
    }


    return (<div onMouseOver={handelDisplay} onMouseLeave={handelHidden} onClick={handleNavigateToRoom} className={`${cx('service_item')} ${typeComponent === "map" ? 'w-[200px] mx-auto' : homePage === "map" ? `hover:scale-1 ${isPreviewPage?'w-[280px]':'w-[90%]'} hover:shadow-normal ${isManagementPage ? '' : 'mb-[40px]'} px-[13px] pt-[13px] pb-[4px]` : "hover:scale-[1.01] hover:shadow-normal mb-[40px] px-[13px] pt-[13px] pb-[4px]"} ${previewPage && 'border-2 border-solid border-[#4c4949]'} flex flex-col justify-center cursor-pointer`}>
        <div className={`relative mb-3 flex justify-center`}>
            <ServiceSlide imgList={imgList} hidden={hidden} previewPage={previewPage} wishList={wishList} handleLike={handleLike} isInterest={isInterest.state}  ref={imgRef} imageList={previewPage ? imageListTemp : imageList} type={type} typeComponent={typeComponent} id={id} />
        </div>
        <div className={`max1380:flex max1380:flex-col max1380:items-center min1500:max-w-[280px] min1500:mx-auto`}>
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

export default memo(ServiceItem);