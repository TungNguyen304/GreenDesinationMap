import { AiOutlineClose } from 'react-icons/ai'
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri'
import { useRef } from 'react';

function ViewImage() {
    const navigate = useNavigate()
    const wrapImageListRef = useRef()
    const [imageListRef, setImageListRef] = useState([])
    const [index, setIndex] = useState(1)
    const isPreviewPage = sessionStorage.getItem('placeTemporary') ? true : false
    const leftRef = useRef()
    const rightRef = useRef()

    let imageList
    if (isPreviewPage) {
        imageList = JSON.parse(sessionStorage.getItem('placeTemporary')).imageList
    }
    else {
        imageList = JSON.parse(localStorage.getItem('service')).imagesCollection
    }

    useEffect(() => {
        wrapImageListRef.current && setImageListRef([...wrapImageListRef.current.children])
    }, [])

    useEffect(() => {
        handleSlideRight(Number(localStorage.getItem('indexImage')))
        setIndex(Number(localStorage.getItem('indexImage')))
    }, [imageListRef])

    function handleSlideLeft() {
        if (imageListRef.length !== 0) {
            let width = imageListRef && Number((window.getComputedStyle(imageListRef[0]).width).slice(0, (window.getComputedStyle(imageListRef[0]).width).length - 2))
            let sum = width
            let marginLeft = imageListRef && (Number((window.getComputedStyle(imageListRef[0]).marginLeft).slice(0, (window.getComputedStyle(imageListRef[0]).marginLeft).length - 2)))
            if (marginLeft !== 0) {
                imageListRef[0].style.marginLeft = `${marginLeft + sum}px`
            }
            else {
                imageListRef[0].style.marginLeft = `${-(imageListRef.length - 1) * (sum / 1)}px`
            }
            if (index === 1)
                setIndex(imageList.length)
            else
                setIndex(index - 1)
        }
    }

    function handleSlideRight(indexCurrent) {
        if (imageListRef.length !== 0) {
            let width = imageListRef && Number((window.getComputedStyle(imageListRef[0]).width).slice(0, (window.getComputedStyle(imageListRef[0]).width).length - 2))
            let sum = width
            let marginLeft = imageListRef && (Number((window.getComputedStyle(imageListRef[0]).marginLeft).slice(0, (window.getComputedStyle(imageListRef[0]).marginLeft).length - 2)))
            if (imageListRef && marginLeft !== -(imageListRef.length - 1) * (sum / 1)) {
                if (indexCurrent) {
                    imageListRef[0].style.marginLeft = String(marginLeft - sum * (indexCurrent - 1)) + 'px'
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
            if (index === imageList.length)
                setIndex(1)
            else
                setIndex(index + 1)
        }
    }


    return (<div className='bg-black text-white h-[100vh]'>
        <div>
            <div className='flex pt-10 items-center mb-10 max600:flex-col'>
                <div className='flex-1 pl-10 max600:pl-0'>
                    <div onClick={() => { navigate(-1); localStorage.removeItem('indexImage') }} className='inline-flex items-center relative font-medium p-2 rounded-lg cursor-pointer hover:bg-slate-500 active:scale-95'>
                        <AiOutlineClose className='mt-[2px]' />
                        <span className=''>Đóng</span>
                    </div>
                </div>
                <div className='flex-1 ml-[-110px] max600:ml-0'>{index}/{imageList.length}</div>
            </div>
            <div className='w-full'>

                <div className='w-[800px] max1024:w-[600px] h-[500px] max1024:h-[400px] max600:w-[90vw] max600:h-[200px] overflow-x-hidden mx-auto relative'>
                    <div ref={wrapImageListRef} className='flex absolute'>
                        {imageList.length !== 0 && imageList.map((item, index) => {
                            return <div style={{ transition: 'all 0.5s ease-in' }} key={isPreviewPage ? index : item.id} className='w-[800px] max1024:w-[600px] h-[500px] max1024:h-[400px] max600:w-[90vw] max600:h-[200px]'>
                                <img className='w-full h-full max600:w-[90vw] max600:h-[200px]' src={isPreviewPage ? item.file : item.name} alt="" />
                            </div>
                        })}
                    </div>
                    <div ref={leftRef} onClick={() => { handleSlideLeft() }} className='text-xl z-10 py-3 px-[11px] border-2 border-solid translate-y-[-50%] rounded-full border-white inline-flex justify-center absolute top-[50%] left-10 hover:bg-[#ffffff4d] hover:border-white active:scale-95 cursor-pointer'>
                        <RiArrowLeftSLine className='mr-[2px]' />
                    </div>
                    <div ref={rightRef} onClick={() => { handleSlideRight() }} className='text-xl py-3 px-[11px] border-2 border-solid translate-y-[-50%] rounded-full border-white inline-flex justify-center absolute top-[50%] right-10 hover:bg-[#ffffff4d] hover:border-white active:scale-95 cursor-pointer'>
                        <RiArrowRightSLine className='ml-[2px]' />
                    </div>
                </div>

            </div>
        </div>
    </div>);
}

export default ViewImage;