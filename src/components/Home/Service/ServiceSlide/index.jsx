import { forwardRef, useImperativeHandle, useRef } from 'react';
import { useSelector } from 'react-redux';
import style from './serviceslide.module.scss'
import classNames from 'classnames/bind';
const cx = classNames.bind(style)

function ServiceSlide({img}, ref) {
    const homePage = useSelector(state => state.homePageReducer.type)
    let clnImg
    if(homePage === "map") {
        clnImg = "w-[280px] h-[260px]"
    }
    else
        clnImg = "w-[320px] h-[300px]"
    const imgRef = useRef()
    useImperativeHandle(ref, () => ({
        getImg: () => imgRef.current.children
    }))
    return ( <div className={`relative rounded-xl ${homePage === "map" ? "w-[280px] h-[240px]" : "w-[320px] h-[300px]"}  overflow-hidden`}>
        <div ref={imgRef} className={`flex absolute`}>
            {img && img.map((item, index) => {
                return (<div key={index} ref={ref} className={`${cx('img')} overflow-hidden ${homePage === "map" ? "w-[280px] h-[240px]" : "w-[320px] h-[320px]"} flex justify-center`}>
                <img className={`${clnImg} object-cover`} src={item} alt="" />
            </div>)
            })}
        </div>
    </div> );
}

export default forwardRef(ServiceSlide);