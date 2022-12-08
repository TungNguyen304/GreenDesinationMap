import Header from "../../../components/common/Header";
import Footer from "../../../components/common/Footer";
import { BiMenu } from 'react-icons/bi'
import { ImMail, ImMail3, ImMail2 } from 'react-icons/im'
import { IoSearchOutline } from 'react-icons/io5'
import { useValueContext } from "../../../hook";
import VerticalNarbar from "../../../components/common/VerticalNavbar";
import { useSelector } from "react-redux";
import BigBox from "../../../components/Home/BigBox";
import Nottification from "../../../components/common/Nottification";
import style from './mailbox.module.scss'
import classNames from 'classnames/bind';
import notificationApi from "../../../api/notificationApi";
import MenuMobile from "../../../components/common/MenuMobile";
import { Fragment, useRef } from "react";
import Loader from "../../../components/common/Loader";
import { useState } from "react";
import { useEffect } from "react";
const cx = classNames.bind(style)

function Mailbox({ title, type }) {
    const loadRef = useRef()
    const wrapMenuRef = useRef()
    const value = useValueContext()
    const [mails, setMails] = useState([])
    const [mailStore, setMailStore] = useState([])
    const { handleDisplayBigBox } = value
    const [typeMail, setTypeMail] = useState("all")
    const show = useSelector(state => state.bigboxReducer.show)
    const account = useSelector(state => state.accountReducer.supplier)
    const listNavItem = [
        {
            name: "Tất cả tin nhắn",
            component: ImMail
        },
        {
            name: "Đã đọc",
            component: ImMail3
        },
        {
            name: "Chưa đọc",
            component: ImMail2
        }
    ]

    useEffect(() => {
        account.id && (async () => {
            const newMail = []
            let mailList = []
            const data = await notificationApi.getByUser(account.id)
            console.log(data);
            loadRef.current && loadRef.current.classList.add("hidden")
            if (data.data.length > 0) {
                let date = new Date(data.data[0].sentdate).toLocaleDateString()
                data.data.forEach((item, index) => {
                    if (new Date(item.sentdate).toLocaleDateString() === date) {
                        mailList.push(item)
                        if (index === data.data.length - 1) {
                            newMail.push({
                                "date": "Ngày " + date,
                                "mailList": mailList
                            })
                        }
                    } else {
                        newMail.push({
                            "date": "Ngày " + date,
                            "mailList": mailList
                        })
                        mailList = [item]
                        date = new Date(item.sentdate).toLocaleDateString()
                        if (index === data.data.length - 1) {
                            newMail.push({
                                "date": "Ngày " + date,
                                "mailList": mailList
                            })
                        }
                    }
                })
                console.log(newMail);
                setMails(newMail)
                setMailStore(newMail)
            }
        })()
    }, [account.id])

    function handleFocus(event) {
        event.nativeEvent.path[1].style.border = '1px solid black'
    }

    function handleBlur(event) {
        event.nativeEvent.path[1].style.border = '1px solid #b0b0b0'
    }

    function handleDisplayMenuMobile() {
        wrapMenuRef.current.classList.toggle("hidden");
    }

    function handleSearch(event) {
        const newMailList = mailStore.filter((item) => {
            return item.date.toLowerCase().includes(event.target.value.toLocaleLowerCase())
        })
        setMails(newMailList)
    }

    return (<div>
        <Header />
        <div className={`${cx('mailbox')}`}>
            <div style={{ height: "calc(100vh - var(--height_header))" }} className="w-[20%] fixed pt-6 px-3 border-r-2 border-solid border-normal bg-[#F7F7F7] max866:hidden">
                <VerticalNarbar cx={cx} style={style} title="Hộp thư" listNavItem={listNavItem} setTypeMail={setTypeMail} />
            </div>
            <div style={{ width: "80%" }} className="ml-auto max400:px-1 pt-6 px-6 bg-normal mr-0 relative">
                <div className="flex items-center">
                    <BiMenu onClick={handleDisplayMenuMobile} className="p-[10px] hover:bg-[#EBEBEB] rounded-full text-[40px] mt-1 mr-2 hidden max866:block" />
                    <span className="font-semibold text-2xl">Tất cả tin nhắn</span>
                </div>
                <div style={{ border: '1px solid #b0b0b0' }} className="flex items-center px-[10px] py-1 bg-[#F7F7F7] rounded-full">
                    <IoSearchOutline />
                    <input onChange={(e) => { handleSearch(e) }} onFocus={(e) => { handleFocus(e) }} onBlur={(e) => { handleBlur(e) }} defaultValue="" type="text" className="w-full bg-inherit ml-1 placeholder:italic" placeholder="Tìm kiếm trong hộp thư đến" />
                </div>
                <div className="pb-16">
                    {mails.length > 0 && mails.map((mail, index) => {
                        return (
                            <div key={index}>
                                {
                                    mail.mailList && mail.mailList.length > 0 && (() => {
                                        const checkList = mail.mailList.map((item) => item.state)
                                        if ((typeMail === "all") || (typeMail === "yes" && checkList.includes(true)) || (typeMail === "no" && checkList.includes(false))) {
                                            return <div className="font-semibold text-lg mt-5 mb-3">{mail.date}</div>
                                        }
                                        return <Fragment></Fragment>
                                    })()
                                }
                                {mail.mailList && mail.mailList.length > 0 && mail.mailList.map((item, subIndex) => {
                                    if (typeMail === "all" || (typeMail === "yes" && item.state) || (typeMail === "no" && !item.state))
                                        return <Nottification key={item.notificationid} mails={mails} index={index} subIndex={subIndex} mail={item} setMails={setMails} />
                                    else return <Fragment key={item.notificationid}></Fragment>
                                })}
                            </div>
                        )
                    })}
                    <div ref={loadRef}>
                        <Loader />
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