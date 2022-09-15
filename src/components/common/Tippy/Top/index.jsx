import {useValueContext} from '../../../../hook'
import { useNavigate } from 'react-router-dom'

function Top({list}) {
    const value = useValueContext()
    const navigate = useNavigate()

    function handleLogin() {
        value.handleDisplayBigBox()
        value.handleSetBigBox('Đăng Nhập hoặc đăng ký', 'login')
    }

    function handleNavigateInterest() {
        navigate('/wishlist')
    }

    return ( <div className="py-2">
        {list && list.map((item, index) => <div onClick={item==='Đăng nhập' || item==='Đăng ký' ? handleLogin : item==='Danh sách yêu thích' ? handleNavigateInterest : () => {}} className="px-4 py-2 hover:bg-[rgba(0,0,0,0.1)]" key={index}>{item}</div>)}
    </div> );
}

export default Top;