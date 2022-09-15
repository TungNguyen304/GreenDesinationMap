import {BiSearch} from 'react-icons/bi'

import style from './searchbar.module.scss'
import classNames from 'classnames/bind';
const cx = classNames.bind(style)

function SearchBar({hidden}) {
    return ( <div className={`flex-1 ${cx('search_bar')} ${hidden!==''? hidden : 'flex'}`}>
        <input style={{'paddingBottom': '2px'}} className='flex-1 mx-4 outline-none text-sm font-medium' type="text" placeholder='Bắt đầu tìm kiếm'/>
        <div className='active:scale-[0.9] select-none'>
            <BiSearch className='text-white'/>
        </div>
    </div>);
}

export default SearchBar;