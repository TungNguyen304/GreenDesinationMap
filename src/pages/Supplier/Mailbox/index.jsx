import Header from "../../../components/common/Header";
import Footer from "../../../components/common/Footer";
import { BiMenu, BiMessage } from 'react-icons/bi'
import { IoSearchOutline } from 'react-icons/io5'
import { MdMarkChatRead, MdMarkChatUnread } from 'react-icons/md'
import { useValueContext } from "../../../hook";
import VerticalNarbar from "../../../components/common/VerticalNavbar";
import { useSelector } from "react-redux";
import BigBox from "../../../components/Home/BigBox";
import Nottification from "../../../components/common/Nottification";
import style from './mailbox.module.scss'
import classNames from 'classnames/bind';
import MenuMobile from "../../../components/common/MenuMobile";
import { useRef } from "react";
const cx = classNames.bind(style)

function Mailbox({ title, type }) {
    const wrapMenuRef = useRef()
    const value = useValueContext()
    const { handleDisplayBigBox } = value
    const show = useSelector(state => state.bigboxReducer.show)
    const listNavItem = [
        {
            name: "Tất cả tin nhắn",
            component: BiMessage
        },
        {
            name: "Đã đọc",
            component: MdMarkChatRead
        },
        {
            name: "Chưa đọc",
            component: MdMarkChatUnread
        }
    ]

    function handleFocus(event) {
        event.nativeEvent.path[1].style.border = '1px solid black'
    }

    function handleBlur(event) {
        event.nativeEvent.path[1].style.border = '1px solid #b0b0b0'
    }

    function handleDisplayMenuMobile() {
        wrapMenuRef.current.classList.toggle("hidden");
    }

    return (<div>
        <Header />
        <div className={`${cx('mailbox')}`}>
            <div className="min-w-[17%] pt-6 px-3 border-r-2 border-solid border-normal bg-[#F7F7F7] max866:hidden">
                <VerticalNarbar title="Hộp thư" listNavItem={listNavItem} />
            </div>
            <div className="flex-1 pt-6 px-6">
                <div className="flex items-center">
                    <BiMenu onClick={handleDisplayMenuMobile} className="p-[10px] hover:bg-[#EBEBEB] rounded-full text-[40px] mt-1 mr-2 hidden max866:block" />
                    <span className="font-semibold text-2xl">Tất cả tin nhắn</span>
                </div>
                <div style={{ border: '1px solid #b0b0b0' }} className="flex items-center px-[10px] py-1 bg-[#F7F7F7] rounded-full">
                    <IoSearchOutline />
                    <input onFocus={(e) => { handleFocus(e) }} onBlur={(e) => { handleBlur(e) }} type="text" className="w-full bg-inherit ml-1 placeholder:italic" placeholder="Tìm kiếm trong hộp thư đến" />
                </div>
                <div>
                    <div className="font-semibold mt-5 mb-3">Ngày 14/4/2022</div>
                    <div>
                        <Nottification />
                        <Nottification />
                    </div>
                </div>
            </div>
        </div>
        {show && <div>
            <BigBox title={title} type={type} handleDisplayBigBox={handleDisplayBigBox} />
        </div>}
        <Footer />
        <div ref={wrapMenuRef} className="hidden">
            <MenuMobile type="mailbox" handleDisplayMenuMobile={handleDisplayMenuMobile} />
        </div>
    </div>);
}

export default Mailbox;