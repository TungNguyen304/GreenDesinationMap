import style from './comment.module.scss'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import classNames from 'classnames/bind';
import { useRef, useState, useEffect } from 'react';
import commentApi from '../../../api/commentApi';
const cx = classNames.bind(style)

function Comment({ id, name, date, placeid, userid, entireDate, handleEditComment, content, commentList, setCommentListFromRoom, setCommentList, image, position, handleDeleteCmt }) {
    const optionRef = useRef()
    const textareaRef = useRef()
    const divRef = useRef()
    const [inputContent, setInputContent] = useState("")
    function handleDisplayOption() {
        optionRef.current.classList.toggle("hidden")
    }

    function handleEditCmt(event) {
        if(content !== inputContent) {
            if (event.type === "keydown") {
                if (event.keyCode === 13 || (event.code === "Enter" && event.keyCode === 229)) {
                    divRef.current.style.display = "-webkit-box"
                    textareaRef.current.classList.add("hidden")
                    optionRef.current.classList.add("hidden")
                }
            } else {
                divRef.current.style.display = "-webkit-box"
                textareaRef.current.classList.add("hidden")
                optionRef.current.classList.add("hidden")
            }
            const newCommentList = commentList.map((item) => {
                if(item.id === id) {
                    return {
                        ...item,
                        "content": inputContent
                    }
                } else return item
            })
            setCommentList([...newCommentList])
            setCommentListFromRoom([...newCommentList])
            handleEditComment(event, id, entireDate, inputContent, placeid, userid)
        }
    }

    useEffect(() => {
        setInputContent(content)
    }, [])

    return (<div className="mb-7 flex justify-between items-center mr-[95px] ssm640:mr-[50px] max600:w-[90%] max600:mx-auto relative">
        <div className='flex flex-col h-full flex-1'>
            <div>
                <div className="flex items-center">
                    <div className="mr-3">
                        <img className="w-[40px] h-[40px] rounded-full" src={image} alt="" />
                    </div>
                    <div>
                        <div className="font-medium">{name}</div>
                        <div className="text-[#717171]">{date}</div>
                    </div>
                </div>
            </div>
            <div ref={divRef} style={{ display: "-webkit-box" }} title={content} className={`${cx('desc')} mt-4 text-[#444242]`}>
                {content}
            </div>
            <textarea onBlur={(e) => { handleEditCmt(e) }} onKeyDown={(e) => { handleEditCmt(e) }} ref={textareaRef} onChange={(e) => { setInputContent(e.target.value) }} className={`mt-4 px-3 text-[#444242] hidden outline-none rounded-md py-1 border border-solid border-black`} value={inputContent} />
        </div>
        <div onClick={handleDisplayOption} className={`p-2 hover:bg-neutral-100 rounded-full cursor-pointer ${position ? '' : 'hidden'}`}>
            <BiDotsVerticalRounded className='text-2xl' />
        </div>
        <div ref={optionRef} className='hidden absolute top-full right-0 w-full bg-[#282e4b] z-10 text-white text-center rounded-md overflow-hidden px-1 py-1'>
            <div onClick={() => {
                optionRef.current.classList.add("hidden")
                divRef.current.style.display = "none"
                textareaRef.current.classList.remove("hidden")
                textareaRef.current.focus()
            }} className='py-2 hover:bg-[#464b65] text-xs rounded-md cursor-pointer active:scale-y-90'>Chỉnh sửa</div>
            <div onClick={() => { handleDeleteCmt(id) }} className='py-2 hover:bg-[#464b65] text-xs rounded-md cursor-pointer active:scale-y-90'>Xóa</div>
        </div>
    </div>);
}

export default Comment;