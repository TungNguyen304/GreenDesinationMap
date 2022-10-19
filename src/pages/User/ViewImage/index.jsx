import { AiOutlineClose } from 'react-icons/ai'
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri'
import imageApi from "../../../api/imageApi";
import { useRef } from 'react';
import { parse } from 'uuid';

function ViewImage() {
    const navigate = useNavigate()
    const [imageList, setImageList] = useState([])
    const wrapImageListRef = useRef()
    const [imageListRef, setImageListRef] = useState([])
    const [index, setIndex] = useState(1)
    const isPreviewPage = localStorage.getItem('placeTemporary') ? true : false
    const leftRef = useRef()
    const rightRef = useRef()
    const params = useParams()

    useEffect(() => {
        !isPreviewPage ? (async () => {
            const data = await imageApi.getAll()
            const newdata = data.data.filter((item) => {
                return item.placeid === Number(params.id)
            })
            setImageList(newdata)
        })() : setImageList([...JSON.parse(localStorage.getItem('placeTemporary')).imageList])
    }, [])
    useEffect(() => {
        wrapImageListRef.current && setImageListRef([...wrapImageListRef.current.children])
    }, [imageList])

    useEffect(() => {
        handleSlideRight(Number(localStorage.getItem('indexImage')))
        setIndex(Number(localStorage.getItem('indexImage')))
    }, [imageListRef])

    function handleSlideLeft() {
        if(imageListRef.length!==0) {
            let width = imageListRef && Number((window.getComputedStyle(imageListRef[0]).width).slice(0, (window.getComputedStyle(imageListRef[0]).width).length - 2))
            let sum = width
            let marginLeft = imageListRef && (Number((window.getComputedStyle(imageListRef[0]).marginLeft).slice(0, (window.getComputedStyle(imageListRef[0]).marginLeft).length - 2)))
            if (marginLeft !== 0) {
                imageListRef[0].style.marginLeft = `${marginLeft + sum}px`
            }
            else {
                imageListRef[0].style.marginLeft = `${-(imageListRef.length - 1) * (sum / 1)}px`
            }
            if(index === 1)
                setIndex(imageList.length)
            else
                setIndex(index-1)
        }
    }

    function handleSlideRight(indexCurrent) {
        if(imageListRef.length!==0) {
            let width = imageListRef && Number((window.getComputedStyle(imageListRef[0]).width).slice(0, (window.getComputedStyle(imageListRef[0]).width).length - 2))
            let sum = width
            let marginLeft = imageListRef && (Number((window.getComputedStyle(imageListRef[0]).marginLeft).slice(0, (window.getComputedStyle(imageListRef[0]).marginLeft).length - 2)))
            if (imageListRef && marginLeft !== -(imageListRef.length - 1) * (sum / 1)) {
                if(indexCurrent) {
                    imageListRef[0].style.marginLeft = String(marginLeft - sum*(indexCurrent-1)) + 'px'
                }
                else if (marginLeft === 0) {
                    imageListRef[0].style.marginLeft = `${-sum}px`
                }
                else {
                    imageListRef[0].style.marginLeft = String(marginLeft - sum) + 'px'
                }
            }
            else {
                if (imageListRef)
                    imageListRef[0].style.marginLeft = `0px`
            }
            if(index === imageList.length)
                setIndex(1)
            else
                setIndex(index+1)
        } 
    }


    return (<div className='bg-black text-white h-[100vh]'>
        <div>
            <div className='flex pt-10 items-center'>
                <div className='flex-1 pl-10'>
                    <div onClick={() => { navigate(-1); localStorage.removeItem('indexImage') }} className='inline-flex items-center relative font-medium p-2 rounded-lg cursor-pointer hover:bg-slate-500 active:scale-95'>
                        <AiOutlineClose className='mt-[2px]' />
                        <span className=''>Đóng</span>
                    </div>
                </div>
                <div className='flex-1 ml-[-110px]'>{index}/{imageList.length}</div>
            </div>
            <div className='w-full mt-10'>
                <div ref={leftRef} onClick={() => {handleSlideLeft()}} className='text-xl py-3 px-[11px] border-2 border-solid rounded-full border-white inline-flex justify-center absolute top-[50%] left-10 hover:bg-[#ffffff4d] hover:border-white active:scale-95 cursor-pointer'>
                    <RiArrowLeftSLine className='mr-[2px]' />
                </div>
                <div className='w-[800px] h-[500px] overflow-x-hidden mx-auto relative'>
                    <div ref={wrapImageListRef} className='flex absolute'>
                        {imageList.length !== 0 && imageList.map((item, index) => {
                            return <div style={{transition: 'all 0.5s ease-in'}} key={isPreviewPage ? index : item.id} className='w-[800px] h-[500px]'>
                                <img className='w-full h-full' src={isPreviewPage ? item.path : item.name} alt="" />
                            </div>
                        })}
                    </div>
                </div>
                <div ref={rightRef} onClick={() => {handleSlideRight()}} className='text-xl py-3 px-[11px] border-2 border-solid rounded-full border-white inline-flex justify-center absolute top-[50%] right-10 hover:bg-[#ffffff4d] hover:border-white active:scale-95 cursor-pointer'>
                    <RiArrowRightSLine className='ml-[2px]' />
                </div>
            </div>
        </div>
    </div>);
}

export default ViewImage;