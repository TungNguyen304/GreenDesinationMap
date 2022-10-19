import Header from "../../../components/common/Header";
import Footer from "../../../components/common/Footer";
import BigBox from "../../../components/Home/BigBox";
import Map from '../../../components/common/Map'
import Comment from "../../../components/Room/Comment";
import Avt from '../../../assets/logo/avt.svg'
import Avt2 from '../../../assets/images/avt.png'
import imageApi from "../../../api/imageApi";
import accountApi from "../../../api/accountApi";
import interestApi from "../../../api/interestApi";
import { useSelector } from "react-redux";
import { GrStar } from 'react-icons/gr'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { AiFillStar } from 'react-icons/ai'
import { TiHeartFullOutline, TiLocation } from 'react-icons/ti'
import { useNavigate } from "react-router-dom";
import { MdVerifiedUser } from 'react-icons/md'
import { useValueContext } from "../../../hook";
import commentApi from "../../../api/commentApi";
import Scroll from 'react-scroll'
import { Link } from "react-router-dom";
import style from './room.module.scss'
import classNames from 'classnames/bind';
import { Fragment, useEffect, useState } from "react";
const cx = classNames.bind(style)

function Room({ type, title }) {
    const navigate = useNavigate()
    const [commentList, setCommentList] = useState([])
    const [isInterest, setIsInterest] = useState(false)
    const [imageList, setImageList] = useState([])
    const [owner, setOwner] = useState([])
    const [totalComment, setTotalComment] = useState(0)
    const value = useValueContext()
    let service = {}
    let isServiceTemporary = false
    if(localStorage.getItem('placeTemporary')) {
        service = JSON.parse(localStorage.getItem('placeTemporary'))
        isServiceTemporary = true
    }
    else {
        service = JSON.parse(localStorage.getItem('service'))
    }
    const account = JSON.parse(localStorage.getItem('account'))
    const accountSupplier = JSON.parse(localStorage.getItem('accountSupplier'))
    const show = useSelector(state => state.bigboxReducer.show)
    let count = 0;
    const currentDay = new Date()


    useEffect(() => {
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop({
            duration: 500,
            smooth: true
        });


    })

    useEffect(() => {
        const count = commentList ? commentList.reduce((total, currentValue) => {
            if (currentValue.placeid === service.id) {
                return total + 1
            }
            return total
        }, 0) : 0;
        setTotalComment(count)
    }, [count, commentList, service])


    useEffect(() => {
        (async () => {
            const data = await commentApi.getAll()
            setCommentList(data.data)
        })()
    }, [])

    useEffect(() => {
        !isServiceTemporary ? (async () => {
            const data = await imageApi.get(`?placeid=${service.id}`)
            setImageList(data.data)
        })() : (() => {
            const data = service.imageList.map((item) => {
                return {
                    name: item.path
                }
            })
            setImageList(data)
        })()
    }, [])

    useEffect(() => {
        (async () => {
            const data = await accountApi.get(accountSupplier.id)
            setOwner(data.data)
        })()
    }, [])

    useEffect(() => {
        (async () => {
            const data = await interestApi.getAll()
            data.data.forEach((item) => {
                if (item.placeid === service.id && account && item.userid === account.id) {
                    setIsInterest(true)
                }
            })
        })()
    }, [])


    function handleLike(even) {
        even.stopPropagation()
        if (localStorage.getItem('account')) {
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

    return (<div className={`${cx("room")}`}>
        <Header isServiceTemporary={isServiceTemporary}/>
        <div className={`small_wrap my-[100px]`}>
            <div className="text-2xl font-semibold">
                {service.name}
            </div>

            <div className="flex justify-between cursor-pointer mt-3 mb-5">
                <div className="flex">
                    <div className="flex items-center mr-5">
                        <AiFillStar />
                        <span>{service.star || 4}</span>
                    </div>
                    <div className="flex underline mr-5">
                        <div><span>180</span> Đánh giá</div>
                    </div>
                    <div className="flex items-center underline">
                        <TiLocation />
                        {service.address || service.road + ', ' + service.ward + ', ' + service.district + ', ' + service.city}
                    </div>
                </div>
                {!isServiceTemporary && <div onClick={(e) => handleLike(e)} className="flex items-center underline active:scale-[0.8] select-none">
                    <TiHeartFullOutline style={{ 'fill': `${isInterest ? 'var(--color_heart)' : 'white'}`, 'stroke': 'black', 'strokeWidth': '1px' }} className="text-base w-[24px] h-[20px] select-none mr-1" />
                    <span>Lưu</span>
                </div>}
            </div>

            <div className="flex h-[390px] rounded-xl overflow-hidden">
                <div className="flex-1 h-full mr-2">
                    <img onClick={handleNavigateToViewImage} className="h-full w-full hover:brightness-[0.8] cursor-pointer" src={imageList.length!==0 ? imageList[0].name : ''} alt="" />
                </div>
                <div className="flex-1 flex flex-col h-full">
                    <div className="flex-1 flex h-[50%] mb-2">
                        <div className="flex-1 h-full mr-2">
                            <img onClick={handleNavigateToViewImage} className="h-full w-full hover:brightness-[0.8] cursor-pointer" src={imageList.length!==0 ? imageList[1].name : ''} alt="" />
                        </div>
                        <div className="flex-1">
                            <img onClick={handleNavigateToViewImage} className="h-full w-full hover:brightness-[0.8] cursor-pointer" src={imageList.length!==0 ? imageList[2].name : ''} alt="" />
                        </div>
                    </div>
                    <div className="flex-1 flex h-50%">
                        <div className="flex-1 h-full mr-2">
                            <img onClick={handleNavigateToViewImage} className="h-full w-full hover:brightness-[0.8] cursor-pointer" src={imageList.length!==0 ? imageList[3].name : ''} alt="" />
                        </div>
                        <div className="flex-1">
                            <img onClick={handleNavigateToViewImage} className="h-full w-full hover:brightness-[0.8] cursor-pointer" src={imageList.length!==0 ? imageList[4].name : ''} alt="" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex mt-9">
                <div className="w-[50%] border-t border-solid border-normal pt-6">
                    <div className="flex justify-between items-center">
                        <div className="text-2xl font-semibold mb-3">
                            <span>Người đăng ký: {owner.username}</span>
                        </div>
                        <div>
                            <div className="inline-block rounded-full overflow-hidden">
                                <img className="w-[56px] h-[56px] " src={owner.image} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className=" pb-6">
                        {service.description}
                    </div>
                </div>


                <div className="w-[50%]"></div>
            </div>

            {!isServiceTemporary && <div className={`${cx('comment')} mt-6 border-t border-solid border-normal pt-9`}>
                <div className="flex items-center text-2xl mb-4">
                    <div className="flex items-center">
                        <GrStar />
                        {service.star}
                    </div>
                    <div className="px-3"> - </div>
                    <div>{totalComment} Đánh giá</div>
                </div>
                <div className="mb-5">
                    <div className="grid grid-cols-2">
                        {commentList.map((item, index) => {
                            if (count < 6) {
                                if (item.placeid === service.id) {
                                    count++;
                                    return <Comment key={index} name={item.username} date={item.date} content={item.content} image={item.image} />
                                }
                                else return <Fragment key={index}></Fragment>
                            }
                            else return <Fragment key={index}></Fragment>
                        })}
                    </div>
                    {totalComment >= 6 && <div onClick={(e) => handleDisplayComment(e)} className="border border-solid border-black rounded-xl inline-block py-3 px-5 cursor-pointer hover:bg-slate-100 active:scale-[0.98] font-semibold">
                        Hiển thị tất cả {totalComment} đánh giá
                    </div>}
                </div>
                <div className={`w-[50%]`}>
                    {account ? <div>
                        <div className="flex items-center mb-6">
                            <div className="mr-5 text-xl font-semibold italic">{account && account.username}</div>
                            <div>
                                <img className="w-[56px] h-[56px] rounded-full" src={account && account.image !== "" ? account.image : account ? Avt2 : Avt} alt="" />
                            </div>
                        </div>
                        <div>
                            <div><label htmlFor="comment" className="text-[#5c5959] text-start">Nhận xét của bạn</label></div>
                            <div className="flex justify-between items-center w-full">
                                <textarea id="comment" type="text" placeholder="Comment ..." className="outline-none mr-5 py-3 px-4 flex-1 border border-solid border-normal placeholder:italic" />
                                <div className="flex flex-col">
                                    <button style={{ 'backgroundColor': 'var(--primary)', "backgroundImage": "linear-gradient(to right, #07D5DF, #7F6DEF, #F408FE)" }} className="hover:brightness-90 active:scale-[0.98] text-white py-2 px-4 rounded-full italic mb-3">Gửi đi</button>
                                    <Link to={`/evaluate/${service.id}`} style={{ 'backgroundColor': 'var(--primary)', "backgroundImage": "linear-gradient(to right, #07D5DF, #7F6DEF, #F408FE)" }} className="hover:brightness-90 active:scale-[0.98] text-white py-2 px-4 rounded-full italic">Đến trang đánh giá</Link>
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
                        <img className="w-[64px] h-[64px] rounded-full" src={owner.image} alt="" />
                    </div>
                    <div>
                        <div className="text-lg font-semibold">Người đăng ký: {service.host}</div>
                        <div>Đã tham gia vào tháng {isServiceTemporary ? currentDay.getMonth() + 1 : service.startday.slice(3, 5)} năm {isServiceTemporary ? currentDay.getFullYear() : service.startday.slice(6, 10)}</div>
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
            <BigBox title={title} type={type} handleDisplayBigBox={value.handleDisplayBigBox} />
        </div>}
        <div onClick={() => {navigate(-1)}} style={{ "backgroundImage": "linear-gradient(to right, #07D5DF, #7F6DEF, #F408FE)" }} className="text-white py-3 px-6 fixed top-[100px] cursor-pointer left-[20px] flex items-center mx-auto rounded-full hover:opacity-90 active:scale-[0.98]">
            <IoMdArrowRoundBack/>
            <span>Back</span>
        </div>
        <Footer />
    </div>);
}

export default Room