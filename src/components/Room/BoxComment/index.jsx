import {IoSearchOutline, IoStar} from 'react-icons/io5'
import { useEffect } from 'react'
import commentApi from '../../../api/commentApi'
import Comment from '../Comment'
import { useState } from 'react'
import style from './boxcomment.module.scss'
import classNames from 'classnames/bind';
const cx = classNames.bind(style)

function BoxComment() {
    const service = JSON.parse(localStorage.getItem('service'))
    const [commentList, setCommentList] = useState([])
    const [totalComment, setTotalComment] = useState(0)
    useEffect(() => {
        (async () => {
            const data = await commentApi.getAll()
            setCommentList(data.data)
        })()
    }, [])

    useEffect(() => {
        const count = commentList ? commentList.reduce((total, currentValue) => {
            if(currentValue.placeid === service.id) {
                return total + 1
            }
            return total
        }, 0) : 0;
        setTotalComment(count)
    }, [commentList, service.id])
    return ( <div className={`${cx('box_comment')} w-[1032px]`}>
        <div className="flex">
            <div className='w-[33.3333%] mr-[8.333%]'>
                <div className="flex items-center text-3xl font-semibold mb-4">
                    <div className="flex items-center">
                        <IoStar className='pb-[5px] mr-1'/>
                        {service.star}
                    </div>
                    <div className="px-3"> - </div>
                    <div>{totalComment} Đánh giá</div>
                </div>
            </div>
            
            <div className='w-[66.6666%]'>
                <div>
                    <div className='flex items-center border border-solid border-[#B0B0B0] px-3 py-2 rounded-full bg-[#F7F7F7] mb-3'>
                        <IoSearchOutline className='text-[#222222] text-xl'/>
                        <input type="text" className='ml-3 w-full bg-[#F7F7F7]' placeholder='Tìm kiếm đánh giá'/>
                    </div>
                </div>
                <div onTouchMove={(e) => {e.preventDefault()}} className={`overflow-y-scroll h-[70vh] ${cx('comment_list')}`}>
                    {commentList && commentList.map((item, index) => {
                        if(item.placeid === service.id) {
                            return <Comment key={index} name={item.username} date={item.date} content={item.content} image={item.image}/>
                        }
                        else return <></>
                    })}
                </div>
            </div>
        </div>
    </div> );
}

export default BoxComment;