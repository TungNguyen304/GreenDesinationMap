import {BiChevronLeft} from 'react-icons/bi'
import { forwardRef } from 'react';
import styles from './Left.module.scss'
import classNames from 'classnames/bind';
const cx = classNames.bind(styles)

function Left({className}, ref) {
    return ( <div ref={ref} onClick={(e) => {e.stopPropagation()}} className={`${cx('left')} ${className} rounded-full`}>
        <BiChevronLeft/>
    </div> );
}

export default forwardRef(Left);