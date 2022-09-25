import { Link } from "react-router-dom";

function NavHeader() {
    return ( <div>
        <div className="h-full">
            <ul className="flex h-full items-center text-[15px] font-medium">
                <li >
                    <Link className={`p-3 mx-2 rounded-full cursor-pointer ${window.location.pathname === '/host' ? 'bg-black text-white hover:opacity-95' : 'hover:bg-gray-100' } `} to='/host'>Hôm nay</Link>
                </li>
                <li>
                    <Link className={`p-3 mx-2 rounded-full cursor-pointer ${window.location.pathname === '/host/mailbox' ? 'bg-black text-white' : 'hover:bg-gray-100' } `} to='/host/mailbox'>Hộp thư đến</Link>
                </li>
                <li>
                    <Link className={`p-3 mx-2 rounded-full cursor-pointer ${window.location.pathname === '/host/management' ? 'bg-black text-white' : 'hover:bg-gray-100' } `} to='/host/management'>Quản lý địa điểm xanh</Link>
                </li>
                <li>
                    <Link className={`p-3 mx-2 rounded-full cursor-pointer ${window.location.pathname === '/host/registerservice' ? 'bg-black text-white' : 'hover:bg-gray-100' } `} to='/host/registerservice'>Đăng ký địa điểm xanh</Link>
                </li>
            </ul>
        </div>
    </div> );
}

export default NavHeader;