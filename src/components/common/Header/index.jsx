import Logo from '../../../assets/images/logo.png'
import Avt from '../../../assets/logo/avt.svg'
import Avt2 from '../../../assets/images/avt.png'
import SearchBar from './SearchBar';
import NavHeader from './NavHeader';
import { useSelector } from 'react-redux';
import { AiFillSetting } from 'react-icons/ai'
import { IoMenuOutline } from 'react-icons/io5'
import Tippy from '../Tippy';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import style from './header.module.scss'
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useState } from 'react';
const cx = classNames.bind(style)

function Header(props) {
    let topList = ['Đăng nhập', 'Đăng ký']
    let bottomList1 = ['Cung cấp dịch vụ', 'Tổ chức trải nghiệm', 'Trợ giúp']
    const [account, setAccount] = useState()
    const actor = window.location.pathname.includes('/host') ? 'supplier' : 'user'
    let acc = useSelector(state => state.accountReducer)
    const tippyRef = useRef()
    let bottomList2
    if (actor === 'user' && account && account.role === 1) {
        topList = ['Tin nhắn', 'Thông báo', 'Danh sách yêu thích']
        bottomList1 = ['Tổ chức trải nghiệm', 'Giới thiệu chủ nhà']
        bottomList2 = ['Tài khoản', 'Trợ giúp', 'Đăng xuất']
    }
    else if (actor === 'supplier' && account && account.role === 2) {
        topList = ['Thông báo', 'Đăng ký địa điểm', 'Quản lý địa điểm']
        bottomList1 = ['Tài khoản', 'Trợ giúp', 'Đăng xuất']
    }
    useEffect(() => {
        if (actor === 'supplier') {
            setAccount(acc.supplier)
        } else {
            setAccount(acc.user)
        }
    }, [acc, actor])

    function removeClass() {
        tippyRef.current && tippyRef.current.classList.add('hidden')
        window.removeEventListener('click', removeClass)
    }
    function handleDisplayTippy(even) {
        const newArr = [...tippyRef.current.classList]
        if (newArr.includes('hidden')) {
            tippyRef.current && tippyRef.current.classList.remove('hidden')
            even.stopPropagation();
            window.addEventListener('click', removeClass)
        }
    }


    return (<div className={`${cx("header")} ${props.isServiceTemporary && 'pointer-events-none'}`}>
        <div className={`${window.location.pathname === '/room' ? 'small_wrap' : 'wrap'} ${cx('wrap_flex')} max-h-[54px]`}>
            <div className='text-primary flex items-center'>
                <a href="/"><img className='w-[150px]' src={Logo} alt="" /></a>
            </div>

            {window.location.pathname.includes('/host') ? <NavHeader /> : <SearchBar {...props} hidden={window.location.pathname !== '/' ? 'hidden' : ''} />}

            <div className='flex justify-end items-center'>
                <div className='text-sm font-medium rounded-full cursor-pointer hover:bg-gray-100'>
                    <Link className='block p-3' to={window.location.pathname.includes('host') ? '/' : '/host'}>{window.location.pathname.includes('host') ? 'Trở thành người dùng' : 'Trở thành nhà cung cấp'}</Link>
                </div>
                <div className='p-3 mr-2 rounded-full hover:bg-gray-100 cursor-pointer'><AiFillSetting /></div>
                <div onClick={(e) => handleDisplayTippy(e)} className={`flex justify-between relative items-center select-none cursor-pointer ${cx('avt')}`}>
                    <div ><IoMenuOutline /></div>
                    <div className='w-7 rounded-full overflow-hidden h-7 ml-3'>
                        <img src={
                            account && account.image ? account.image : account ? Avt2 : Avt
                        } alt="" />
                    </div>
                    <div ref={tippyRef} onClick={(e) => { e.stopPropagation() }} className={`${'tippy'} hidden`}>
                        <Tippy topList={topList} bottomList1={bottomList1} bottomList2={bottomList2} />
                    </div>
                </div>
            </div>
        </div>
        <div className={cx("header_virtual")}></div>
    </div>);
}

export default Header;