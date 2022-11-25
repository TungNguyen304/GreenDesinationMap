import { IoSearchOutline, IoStar } from 'react-icons/io5'
import { useEffect } from 'react'
import commentApi from '../../../api/commentApi'
import { BsPatchCheckFill } from 'react-icons/bs'
import Comment from '../Comment'
import { useState } from 'react'
import style from './boxcomment.module.scss'
import classNames from 'classnames/bind';
import { useRef } from 'react'
import Loader from '../../common/Loader'
const cx = classNames.bind(style)

function BoxComment({setCommentListFromRoom}) {
    const loadRef = useRef()
    const service = JSON.parse(localStorage.getItem('service'))
    const [commentList, setCommentList] = useState([])
    const [totalComment, setTotalComment] = useState(0)
    useEffect(() => {
        (async () => {
            const data = await commentApi.getCommentByPlaceId(service.id)
            loadRef.current.classList.add("hidden")
            setCommentList(data.data)
        })()
    }, [])

    useEffect(() => {
        const count = commentList.length
        setTotalComment(count)
    }, [commentList.length, service.id])

    function handleDeleteCmt(id) {
        const newCommentList = commentList.filter((item) => {
            return item.id !== id
        })
        setCommentList([...newCommentList])
        setCommentListFromRoom([...newCommentList])
        commentApi.deleteComment(id)
    }

    function handleEditComment(event, id, entireDate, inputContent, placeid, userid) {
        commentApi.updateComment({
            "commentid": id,
            "postdate": entireDate,
            "content": inputContent,
            "placeModel": {
                "placeid": placeid
            },
            "userModel": {
                "userid": userid
            }

        })
        
    }

    return (<div className={`${cx('box_comment')} w-[1032px]`}>
        <div className="flex">
            <div className='w-[33.3333%] mr-[8.333%]'>
                <div className="flex items-center text-3xl font-semibold mb-4">
                    <div className="flex items-center">
                        <IoStar className='pb-[5px] mr-1 text-yellow-600' />
                        {service.star}
                    </div>
                    <div className="px-3"> - </div>
                    <div>{totalComment} Đánh giá</div>
                </div>
                <div className="">
                    {service.criteriaList.map((item, index) => {
                        return <div key={index} className="flex items-center mb-3">
                            <BsPatchCheckFill className="mt-[-3px] shrink-0 text-2xl mr-3 text-green-600" />
                            <div>{item.criteriasModel.criterianame}</div>
                        </div>
                    })}
                </div>
            </div>

            <div className='w-[66.6666%]'>
                <div>
                    <div className='flex items-center border border-solid border-[#B0B0B0] px-3 py-2 rounded-full bg-[#F7F7F7] mb-3'>
                        <IoSearchOutline className='text-[#222222] text-xl' />
                        <input type="text" className='ml-3 w-full bg-[#F7F7F7]' placeholder='Tìm kiếm đánh giá' />
                    </div>
                </div>
                <div onTouchMove={(e) => { e.preventDefault() }} className={`overflow-y-scroll h-[70vh] relative ${cx('comment_list')}`}>
                    {commentList && commentList.map((item, index) => {
                        return <Comment key={item.id} id={item.id} name={item.username} userid={item.userid} entireDate={item.entireDate} placeid={service.id} date={item.date} 
                        content={item.content} image={item.image} position="boxcmt" handleEditComment={handleEditComment} handleDeleteCmt={handleDeleteCmt} 
                        setCommentList={setCommentList} setCommentListFromRoom={setCommentListFromRoom} commentList={commentList}/>
                    })}
                    <div ref={loadRef}>
                        <Loader/>
                    </div>
                </div>
            </div>
        </div>
    </div>);
}

export default BoxComment;