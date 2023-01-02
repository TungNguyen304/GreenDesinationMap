import { Link } from "react-router-dom";
import { GiHamburgerMenu } from 'react-icons/gi'
import { useMenuMobileContext } from "../../../../hook";

function NavHeader() {
    const context = useMenuMobileContext()
    return (<div>
        <div className="h-full">
            <ul className="flex h-full items-center text-[15px] font-medium max866:hidden">
                <li >
                    <Link className={`p-3 mx-2 rounded-full whitespace-nowrap cursor-pointer ${window.location.pathname === '/host' ? 'bg-black text-white hover:opacity-95' : 'hover:bg-gray-100'} `} to='/host'>Hôm nay</Link>
                </li>
                <li>
                    <Link className={`p-3 mx-2 rounded-full whitespace-nowrap cursor-pointer ${window.location.pathname === '/host/mailbox' ? 'bg-black text-white' : 'hover:bg-gray-100'} `} to='/host/mailbox'>Hộp thư đến</Link>
                </li>
                <li>
                    <Link className={`p-3 mx-2 rounded-full whitespace-nowrap cursor-pointer ${window.location.pathname === '/host/management' ? 'bg-black text-white' : 'hover:bg-gray-100'} `} to='/host/management'>Quản lý địa điểm xanh</Link>
                </li>
                <li>
                    <Link className={`p-3 mx-2 rounded-full whitespace-nowrap cursor-pointer ${window.location.pathname === '/host/registerservice' ? 'bg-black text-white' : 'hover:bg-gray-100'} `} to='/host/registerservice'>Đăng ký địa điểm xanh</Link>
                </li>
            </ul>
            <div onClick={context} className='p-3 text-2xl hover:bg-slate-100 relative hidden ssm767:block'>
                <GiHamburgerMenu className='text-[#6d6b6b]' />
            </div>
        </div>
    </div>);
}

export default NavHeader;