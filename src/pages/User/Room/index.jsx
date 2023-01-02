import Header from "../../../components/common/Header";
import Footer from "../../../components/common/Footer";
import BigBox from "../../../components/Home/BigBox";
import Map from '../../../components/common/Map'
import Comment from "../../../components/Room/Comment";
import Avt from '../../../assets/logo/avt.svg'
import Avt2 from '../../../assets/images/avt.png'
import accountApi from "../../../api/accountApi";
import interestApi from "../../../api/interestApi";
import { v4 } from "uuid";
import { useSelector } from "react-redux";
import { GrStar } from 'react-icons/gr'
import { AiFillStar } from 'react-icons/ai'
import { TiHeartFullOutline, TiLocation } from 'react-icons/ti'
import { useNavigate } from "react-router-dom";
import { MdVerifiedUser } from 'react-icons/md'
import { useValueContext } from "../../../hook";
import { BsPatchCheckFill } from 'react-icons/bs'
import commentApi from "../../../api/commentApi";
import Scroll from 'react-scroll'
import { Link } from "react-router-dom";
import style from './room.module.scss'
import classNames from 'classnames/bind';
import { Fragment, useEffect, useState } from "react";
const cx = classNames.bind(style)

function Room({ type, title }) {
    const navigate = useNavigate()
    const [isInterest, setIsInterest] = useState(false)
    const [totalComment, setTotalComment] = useState(0)
    const [commentList, setCommentList] = useState([])
    const [contentCmt, setContentCmt] = useState("")
    const value = useValueContext()
    const isServiceTemporary = window.location.pathname.includes('/room/temporary')
    const isHost = window.location.pathname.includes('/host/')
    let service = {}
    let imageList = []
    if (isServiceTemporary) {
        service = JSON.parse(sessionStorage.getItem('placeTemporary'))
        imageList = service.imageList
    }
    else {
        service = JSON.parse(localStorage.getItem('service'))
        imageList = service.imagesCollection
    }
    const accountCommon = useSelector(state => state.accountReducer)
    const account = isServiceTemporary || isHost ? accountCommon.supplier : accountCommon.user
    const show = useSelector(state => state.bigboxReducer.show)
    let count = 0;
    const currentDay = new Date()


    useEffect(() => {
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop({
            duration: 500,
            smooth: true
        });
    }, [])

    useEffect(() => {
        !isServiceTemporary && (async () => {
            value.loadRef().classList.remove("hidden")
            const data = await commentApi.getCommentByPlaceId(service.id)
            value.loadRef().classList.add("hidden")
            setCommentList(data.data)
        })()
    }, [service.id])

    useEffect(() => {
        const count = commentList.length
        setTotalComment(count)
    }, [commentList.length, service.id])

    function handleLike(even) {
        even.stopPropagation()
        if (localStorage.getItem('user')) {
            if (even.target.farthestViewportElement.style.fill !== 'var(--color_heart)') {
                value.handleSetBigBox('Danh sách yêu thích của bạn', 'interests')
                value.handleDisplayBigBox()
                // even.target.style.fill = 'var(--color_heart)'
            }
            else {
                even.target.farthestViewportElement.style.fill = 'white'
            }
        }
        else {
            value.handleSetBigBox('Chào mừng bạn đến với GreenMap', 'login')
            value.handleDisplayBigBox()
        }
    }


    function handleDisplayComment(e) {
        value.handleSetBigBox('', 'comment')
        value.handleDisplayBigBox()
    }

    function handleNavigateToViewImage() {
        navigate(`${window.location.pathname}/viewlistimage`)
    }
    
    function formatTime(time) {
        if(String(time).length === 1) {
            return '0' + time
        }
        return time
    }

    function handleSubmitCommentCallBack() {
        var today = new Date();
        var date = today.getFullYear() + '-' + formatTime(today.getMonth() + 1) + '-' + formatTime(today.getDate());
        var time = formatTime(today.getHours()) + ":" + formatTime(today.getMinutes()) + ":" + formatTime(today.getSeconds());
        var dateTime = date + 'T' + time;

        
        setCommentList([ {
            "id": v4(),
            "userid": account.id,
            "placeid": service.id,
            "username":account.username,
            "content": contentCmt,
            "image": account.image,
            "date": new Date(date).toLocaleDateString("vi-VN")
        }, ...commentList])


        commentApi.postComment({
            "postdate": dateTime,
            "content": contentCmt,
            "placeModel": {
                "placeid": service.id
            },
            "userModel": {
                "userid": account.id
            }
        })

        setContentCmt("")
    }

    function handleSubmitComment(event) {
        if (event.type === "keydown") {
            if ((event.code === "Enter" && event.keyCode === 13)) {
                handleSubmitCommentCallBack()
            } 
        } else {
            handleSubmitCommentCallBack()
        }
    }

    return (<div className={`${cx("room")}`}>
        <Header isServiceTemporary={isServiceTemporary} />
        <div className={`small_wrap mt-[100px] slg1250:mb-[100px] mb-5`}>
            <div className="text-2xl font-semibold">
                {service.name}
            </div>
 
            <div className="flex justify-between cursor-pointer mt-3 mb-5">
                <div className="flex max866:flex-col">
                    <div className="flex items-center">
                        <div className="flex items-center mr-5">
                            <AiFillStar className="text-2xl text-yellow-600 w-[24px]" />
                            <span>{service.star || 4} </span>
                        </div>
                        <div className="flex underline mr-5">
                            <div><span>180</span> Đánh giá</div>
                        </div>
                    </div>
                    <div className="flex items-center underline">
                        <TiLocation className="text-2xl shrink-0 text-green-600 w-[24px]" />
                        {service.address || service.road + ', ' + service.ward + ', ' + service.district + ', ' + service.city}
                    </div>
                </div>

                {!isServiceTemporary && <div onClick={(e) => handleLike(e)} className="flex items-center underline active:scale-[0.8] select-none">
                    <TiHeartFullOutline style={{ 'fill': `${isInterest ? 'var(--color_heart)' : 'white'}`, 'stroke': 'black', 'strokeWidth': '1px' }} className="text-base w-[24px] h-[20px] select-none mr-1" />
                    <span>Lưu</span>
                </div>}
            </div>

            <div className="flex h-[390px] rounded-xl overflow-hidden">
                <div className="flex-1 h-full mr-2 ssm767:mr-0">
                    <img onClick={handleNavigateToViewImage} className="h-full max505:h-[70%] max400:h-[50%] max505:rounded-xl  w-full hover:brightness-[0.8] cursor-pointer" src={imageList && imageList.length !== 0 ? isServiceTemporary ? imageList[0].file : imageList[0].name : ''} alt="" />
                </div>
                <div className="flex-1 flex flex-col h-full ssm767:hidden">
                    <div className="flex-1 flex h-[50%] mb-2">
                        <div className="flex-1 h-full mr-2">
                            <img onClick={handleNavigateToViewImage} className="h-full w-full hover:brightness-[0.8] cursor-pointer" src={imageList && imageList.length !== 0 ? isServiceTemporary ? imageList[1].file : imageList[1].name : ''} alt="" />
                        </div>
                        <div className="flex-1">
                            <img onClick={handleNavigateToViewImage} className="h-full w-full hover:brightness-[0.8] cursor-pointer" src={imageList && imageList.length !== 0 ? isServiceTemporary ? imageList[2].file : imageList[2].name : ''} alt="" />
                        </div>
                    </div>
                    <div className="flex-1 flex h-50%">
                        <div className="flex-1 h-full mr-2">
                            <img onClick={handleNavigateToViewImage} className="h-full w-full hover:brightness-[0.8] cursor-pointer" src={imageList && imageList.length !== 0 ? isServiceTemporary ? imageList[3].file : imageList[3].name : ''} alt="" />
                        </div>
                        <div className="flex-1">
                            <img onClick={handleNavigateToViewImage} className="h-full w-full hover:brightness-[0.8] cursor-pointer" src={imageList && imageList.length !== 0 ? isServiceTemporary ? imageList[4].file : imageList[4].name : ''} alt="" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex mt-9">
                <div className="w-[50%] ssm767:w-full border-t border-solid border-normal pt-6">
                    <div className="flex justify-between items-center">
                        <div className="text-2xl font-semibold mb-3">
                            <span>Người đăng ký: {isServiceTemporary ? account.username : service.host}</span>
                        </div>
                        <div>
                            <div className="inline-block rounded-full overflow-hidden">
                                <img className="w-[56px] h-[56px]" src={isServiceTemporary ? account.image : service.useravt} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className=" pb-6">
                        {service.description}
                    </div>
                </div>
                <div className="w-[50%] ssm767:hidden"></div>
            </div>

            <div className="border-t border-solid border-normal pt-9">
                <div className="text-2xl font-semibold mb-3">Các tiêu chí xanh được chứng nhận bởi <span className="underline text-green-600">GREEN DESTINATION TEAM</span></div>
                <div className="">
                    {service.criteriaList.map((item, index) => {
                        return <div key={index} className="flex items-center mb-3">
                            <BsPatchCheckFill className="mt-[-3px] shrink-0 text-2xl mr-3 text-green-600" />
                            <div>{isServiceTemporary ? item.name : item.criteriasModel.criterianame}</div>
                        </div>
                    })}
                </div>
            </div>

            {!isServiceTemporary && <div className={`${cx('comment')} mt-6 border-t border-solid border-normal pt-9`}>
                <div className="flex items-center text-2xl mb-4">
                    <div className="flex items-center">
                        <GrStar className="text-yellow-600 mt-[-2px]" />
                        {service.star}
                    </div>
                    <div className="px-3"> - </div>
                    <div>{totalComment} Đánh giá</div>
                </div>
                <div className="mb-5">
                    <div className="grid grid-cols-2 max600:grid-cols-1">
                        {commentList.length > 0 && commentList.map((item) => {
                            if (count < 6) {
                                count++;
                                return <Comment key={item.id} id={item.id} name={item.username} date={item.date} content={item.content} image={item.image} />
                            }
                            else return <Fragment key={item.id}></Fragment>
                        })}
                    </div>
                    {<div onClick={(e) => handleDisplayComment(e)} className="border border-solid border-black rounded-xl inline-block py-3 px-5 cursor-pointer hover:bg-slate-100 active:scale-[0.98] font-semibold">
                        Hiển thị tất cả {totalComment} đánh giá
                    </div>}
                </div>
                <div className={`w-[50%] ssm767:w-full`}>
                    {account.username ? <div>
                        <div className="flex items-center mb-6">
                            <div>
                                <img className="w-[56px] h-[56px] rounded-full" src={account && account.image !== "" ? account.image : account ? Avt2 : Avt} alt="" />
                            </div>
                            <div className="ml-5 text-xl font-semibold italic">{account && account.username}</div>
                        </div>
                        <div>
                            <div><label htmlFor="comment" className="text-[#5c5959] text-start">Nhận xét của bạn</label></div>
                            <div className="flex max477:flex-col max477:items-start justify-between items-center w-full">
                                <textarea onKeyDown={(e) => {handleSubmitComment(e)}} onChange={(e) => { setContentCmt(e.target.value) }} value={contentCmt} id="comment" type="text" placeholder="Comment ..." className="max477:w-full outline-none mr-5 py-3 px-4 flex-1 border border-solid border-normal placeholder:italic" />
                                <div className="flex flex-col max477:items-center max477:mt-5 max477:w-full">
                                    <button onClick={(e) => {handleSubmitComment(e)}} style={{ 'backgroundColor': 'var(--primary)', "backgroundImage": "linear-gradient(to right, #07D5DF, #7F6DEF, #F408FE)" }} className="hover:brightness-90 active:scale-[0.98] text-white py-2 px-4 rounded-md italic mb-3">Gửi đi</button>
                                    <Link to={`/evaluate/${service.id}`} style={{ 'backgroundColor': 'var(--primary)', "backgroundImage": "linear-gradient(to right, #07D5DF, #7F6DEF, #F408FE)" }} className="hover:brightness-90 active:scale-[0.98] text-white py-2 px-4 rounded-md italic">Đến trang đánh giá</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                        :
                        <div>
                            <button onClick={(e) => {
                                value.handleDisplayBigBox()
                                value.handleSetBigBox('Đăng Nhập', 'login')
                            }} style={{ 'backgroundColor': 'var(--primary)', "backgroundImage": "linear-gradient(to right, #07D5DF, #7F6DEF, #F408FE)" }} className="hover:brightness-90 active:scale-[0.98] text-white py-2 px-4 rounded-full italic mb-3">Bình luận và đánh giá</button>
                        </div>
                    }

                </div>

            </div>}

            <div className="w-full h-[70vh] mt-6">
                <Map serviceRoom={service} />
            </div>

            <div className="mt-6">
                <div className="flex items-center">
                    <div className="mr-5">
                        <img className="w-[64px] h-[64px] rounded-full" src={isServiceTemporary ? account.image : service.useravt} alt="" />
                    </div>
                    <div>
                        <div className="text-lg font-semibold">Người đăng ký: {isServiceTemporary ? account.username : service.host}</div>
                        <div>Đã tham gia vào tháng {isServiceTemporary ? currentDay.getMonth() + 1 : service.startday.slice(service.startday.indexOf("/") + 1, service.startday.lastIndexOf("/"))} năm {isServiceTemporary ? currentDay.getFullYear() : service.startday.slice(service.startday.lastIndexOf("/") + 1, service.startday.length)}</div>
                    </div>
                </div>
                <div className="flex mt-4">
                    <div className="flex items-center mr-6">
                        <AiFillStar className="mr-2" />
                        <span>438 đánh giá</span>
                    </div>
                    <div className="flex items-center">
                        <MdVerifiedUser className="mr-2" />
                        <span>Đã xác minh danh tính</span>
                    </div>
                </div>
            </div>
        </div>
        {show && <div>
            <BigBox title={title} type={type} handleDisplayBigBox={value.handleDisplayBigBox} commentList={commentList} setCommentList={setCommentList} />
        </div>}
        <Footer />
    </div>);
}

export default Room