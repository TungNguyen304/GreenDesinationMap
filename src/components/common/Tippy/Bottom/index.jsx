import { useNavigate } from "react-router-dom";
import { useValueContext } from "../../../../hook";

function Bottom({ list }) {
    const navigate = useNavigate()
    const { handleSetBigBox, handleDisplayBigBox } = useValueContext()
    const role = window.location.pathname.includes('/host') ? 2 : 1

    function handleLogout() {
        if (role === 1) {
            localStorage.removeItem('user')
            navigate('/')
        }
        else if (role === 2) {
            localStorage.removeItem('supplier')
            navigate('/host')
        }
        window.location.reload()
    }

    function handleNavigateAccountPage() {
        if (role === 1) {
            navigate('/account')
        }
        else if (role === 2) {
            navigate('/host/account')
        }
    }


    function handleDisplayFilter() {
        handleSetBigBox('Bộ lọc', 'filter')
        handleDisplayBigBox()
    }

    return (<div className="border-t border-solid border-[#DDDDDD] py-2">
        {list && list.map((item, index) => <div onClick={item === 'Đăng xuất' ? handleLogout : item === 'Tài khoản' ? handleNavigateAccountPage : 'Bộ lọc' ? handleDisplayFilter : () => { }} className="px-4 py-2 hover:bg-[rgba(0,0,0,0.1)]" key={index}>{item}</div>)}
    </div>);
}

export default Bottom;