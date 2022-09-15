import { forwardRef, useImperativeHandle, useRef } from 'react';
import style from './serviceslide.module.scss'
import classNames from 'classnames/bind';
const cx = classNames.bind(style)

function ServiceSlide({img}, ref) {
    const imgRef = useRef()
    useImperativeHandle(ref, () => ({
        getImg: () => imgRef.current.children
    }))
    return ( <div className="relative rounded-xl w-[320px] h-[300px] overflow-hidden">
        <div ref={imgRef} className={`flex absolute`}>
            {img.map((item, index) => {
                return (<div key={index} ref={ref} className={`${cx('img')} overflow-hidden flex justify-center`}>
                <img className="w-[320px] h-[300px]" src={item} alt="" />
            </div>)
            })}
        </div>
    </div> );
}

export default forwardRef(ServiceSlide);