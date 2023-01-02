import {useValueContext} from '../../../../hook'
import { useNavigate } from 'react-router-dom'

function Top({list, removeImage, handleChangeImage}) {
    const value = useValueContext()
    const navigate = useNavigate()

    function handleLogin() {
        value.handleDisplayBigBox()
        value.handleSetBigBox('Đăng Nhập', 'login')
    }

    function handleRegister() {
        value.handleDisplayBigBox()
        value.handleSetBigBox('Đăng ký', 'register')
    }

    function handleNavigateInterest() {
        navigate('/wishlist')
    }

    return ( <div className="py-2">
        {list && list.map((item, index) => <div onClick={item==='Đăng nhập' ? handleLogin : item==='Đăng ký' ? handleRegister : item==='Danh sách yêu thích' ? handleNavigateInterest : item ==='Xóa' ? removeImage : item==="Thay đổi" ? handleChangeImage : () => {}} className="px-4 py-2 hover:bg-[rgba(0,0,0,0.1)]" key={index}>{item}</div>)}
    </div> );
}

export default Top;