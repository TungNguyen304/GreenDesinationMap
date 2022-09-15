import { useNavigate } from "react-router-dom";

function Bottom({list}) {
    const navigate = useNavigate()
    function handleLogout() {
        localStorage.removeItem('phone')
        window.location.reload()
    }

    return ( <div className="border-t border-solid border-[#DDDDDD] py-2">
        {list && list.map((item, index) => <div onClick={item==='Đăng xuất' ? handleLogout: item==='Tài khoản' ? ()=>{navigate('/account')}: ()=>{}} className="px-4 py-2 hover:bg-[rgba(0,0,0,0.1)]" key={index}>{item}</div>)}
    </div> );
}

export default Bottom;