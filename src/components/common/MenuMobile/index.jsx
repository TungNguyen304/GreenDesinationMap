import { MdBackspace } from 'react-icons/md'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useValueContext } from '../../../hook';
import React from 'react';

function MenuMobile({ handleDisplayMenuMobile }, ref) {
    const { handleSetBigBox, handleDisplayBigBox } = useValueContext()
    const navigate = useNavigate()
    const user = useSelector(state => state.accountReducer.user)
    const supplier = useSelector(state => state.accountReducer.supplier)
    const isUserPage = !window.location.pathname.includes('/host')
    const funcObj = {
        "Trở thành nhà cung cấp": handleNavigateSupplier,
        "Trở thành người dùng": handleNavigateUser,
        "Tài khoản": isUserPage ? handleNavigateUserAccount : handleNavigateSupplierAccount,
        "Bộ lọc": handleDisplayFilter,
        "Danh sách yêu thích": handleNavigateWishList,
        "Đăng xuất": handleLogout,
        "Đăng nhập": handleLogin,
        "Đăng ký": handleRegister,
        "Hộp thư đến": handleNavigateMailBox,
        "Quản lý địa điểm": handleNavigateManagement,
        "Đăng ký địa điểm": handleNavigateRegisterService
    }
    let funcList
    if (user.id && !window.location.pathname.includes('/host')) {
        funcList = ["Trở thành nhà cung cấp", "Tài khoản", "Bộ lọc", "Danh sách yêu thích", "Đăng xuất"]
    } else if (supplier.id && window.location.pathname.includes('/host')) {
        funcList = ["Trở thành người dùng", "Hộp thư đến", "Đăng ký địa điểm", "Quản lý địa điểm", "Tài khoản", "Đăng xuất"]
    }
    else
        funcList = ["Đăng nhập", "Đăng ký"]


    function handleNavigateSupplier() {
        handleDisplayMenuMobile()
        navigate('/host')
    }

    function handleNavigateUser() {
        handleDisplayMenuMobile()
        navigate('/')
    }

    function handleNavigateSupplierAccount() {
        handleDisplayMenuMobile()
        navigate('/host/account')
    }

    function handleNavigateUserAccount() {
        handleDisplayMenuMobile()
        navigate('/account')
    }

    function handleDisplayFilter() {
        handleDisplayMenuMobile()
        handleSetBigBox('Bộ lọc', 'filter')
        handleDisplayBigBox()
    }

    function handleNavigateWishList() {
        handleDisplayMenuMobile()
        navigate('/wishlist')
    }

    function handleLogout() {
        if (isUserPage) {
            document.cookie = `user_id=; expires=thu, 25 Jan 2021 00:00:00 UTC`
            navigate('/')
        }
        else {
            document.cookie = `supplier_id=; expires=thu, 25 Jan 2021 00:00:00 UTC`
            navigate('/host')
        }
        window.location.reload()
    }

    function handleLogin() {
        handleDisplayMenuMobile()
        handleDisplayBigBox()
        handleSetBigBox('Đăng Nhập', 'login')
    }

    function handleRegister() {
        handleDisplayMenuMobile()
        handleDisplayBigBox()
        handleSetBigBox('Đăng ký', 'register')
    }

    function handleNavigateMailBox() {
        handleDisplayMenuMobile()
        navigate('/host/mailbox')
    }

    function handleNavigateManagement() {
        handleDisplayMenuMobile()
        navigate('/host/management')
    }

    function handleNavigateRegisterService() {
        handleDisplayMenuMobile()
        navigate('/host/registerservice')
    }

    return (<div onClick={handleDisplayMenuMobile} className='fixed w-[100vw] h-[100vh] top-0 left-0 bg-[#000000b3] z-[100]'>
        <div onClick={(e) => { e.stopPropagation() }} ref={ref} className='absolute w-[90%] h-full bg-white p-5'>
            <div className='text-[3.5rem]'>
                <MdBackspace className='active:scale-95 hover:bg-slate-200 p-3 pr-4 rounded-lg' onClick={handleDisplayMenuMobile} />
            </div>
            <ul className='text-xl'>
                {funcList.map((item, index) => {
                    return <li key={index}
                        onClick={funcObj[item]}
                        className='border-b border-solid border-black py-3 hover:bg-slate-100'>{item}</li>
                })}
            </ul>
        </div>
    </div>);
}

export default React.forwardRef(MenuMobile);