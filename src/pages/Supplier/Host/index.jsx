import Header from "../../../components/common/Header";
import Footer from "../../../components/common/Footer";
import { useValueContext } from "../../../hook";
import { useSelector } from "react-redux";
import Map from "../../../components/common/Map";
import BigBox from "../../../components/Home/BigBox";
import serviceApi from '../../../api/serviceApi'
import NotificationSmall from "../../../components/NotificationSmall";
import style from './host.module.scss'
import classNames from 'classnames/bind';
import { useEffect } from "react";
import { useState } from "react";
import notificationApi from "../../../api/notificationApi";
const cx = classNames.bind(style)

function Host({ title, type }) {
    const account = useSelector(state => state.accountReducer).supplier
    const value = useValueContext()
    const { handleDisplayBigBox } = value
    const show = useSelector(state => state.bigboxReducer.show)
    const [positionList, setPositionList] = useState([])
    const [notifyList, setNotifyList] = useState([])

    useEffect(() => {
        account.id && (async () => {
            value.loadRef().classList.remove("hidden")
            const data = await serviceApi.getByUserId(account.id)
            value.loadRef().classList.add("hidden")
            setPositionList(data.data)
        })()
    }, [account.id])

    useEffect(() => {
        (async () => {
            const data = await notificationApi.getByUser(account.id)
            const date = new Date()
            const newData = data.data.filter((item) => {
                return new Date (item.sentdate).toLocaleDateString() === date.toLocaleDateString()
            })
            setNotifyList(newData)
        })()
    }, [account.id])

    return (<div>
        <Header />
        <div className={`${cx('body')}`}>
            <div className={`${cx('nottification')}`}>
                <div className="wrap py-[64px] px-[32px]">
                    <div className="text-3xl font-semibold text-white">
                        Hôm nay
                    </div>
                    <div className="grid grid-cols-4 gap-3 overflow-x-visible mt-6 min-h-[122px]">
                        {notifyList.length > 0 && notifyList.map((item, index) => {
                            return <NotificationSmall key={item.notificationid} mail={item}/>
                        })}
                    </div>
                </div>
            </div>
        </div>


        <div className="wrap mt-8 slg1250:mb-[80px]">
            <div className="text-xl font-semibold italic mb-3">Các địa điểm xanh của bạn (*<span>{positionList && positionList.length ? positionList.length : account ? 0 : 'Chưa đăng nhập'}</span>)</div>
            <div className="h-[90vh]">
                <Map positionList={positionList} />
            </div>
        </div>

        {show && <div>
            <BigBox title={title} type={type} handleDisplayBigBox={handleDisplayBigBox} />
        </div>}
        <Footer />
    </div>);
}

export default Host;