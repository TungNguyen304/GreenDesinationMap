import {BiChevronRight} from 'react-icons/bi'
import { forwardRef } from 'react';
import styles from './Right.module.scss'
import classNames from 'classnames/bind';

const cx = classNames.bind(styles)
function Right({className}, ref) {
    return ( <div ref={ref} onClick={(e) => {e.stopPropagation()}} className={`${cx('right')} ${className} rounded-full`}>
        <BiChevronRight/>
    </div> );
}

export default forwardRef(Right);