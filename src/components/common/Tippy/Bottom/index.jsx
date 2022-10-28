import { useNavigate } from "react-router-dom";

function Bottom({ list }) {
    const navigate = useNavigate()
    const role = window.location.pathname.includes('/host') ? 2 : 1

    function handleLogout() {
        if (role === 1) {
            document.cookie = `user_id=; expires=thu, 25 Jan 2021 00:00:00 UTC`
            navigate('/')
        }
        else if (role === 2) {
            document.cookie = `supplier_id=; expires=thu, 25 Jan 2021 00:00:00 UTC`
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

    return (<div className="border-t border-solid border-[#DDDDDD] py-2">
        {list && list.map((item, index) => <div onClick={item === 'Đăng xuất' ? handleLogout : item === 'Tài khoản' ? handleNavigateAccountPage : () => { }} className="px-4 py-2 hover:bg-[rgba(0,0,0,0.1)]" key={index}>{item}</div>)}
    </div>);
}

export default Bottom;