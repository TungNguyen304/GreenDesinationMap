import { setIsDraging } from '../../../../store/actions/drag'
import { BsThreeDots } from 'react-icons/bs'
import Tippy from '../../Tippy'
import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import React from 'react'

function Image({optionList, handleDrag, handleDeleteImage, pathCurrent, type, position, setPathCurrent, path, fileRef}, optionRef) {
    const dispatch = useDispatch()
    const imgRef = useRef()
    
    useEffect(() => {
        setPathCurrent(path)
        if (path) {
            if (typeof path.file === 'string') {
                imgRef.current.src = path.file
            } else {
                var reader = new FileReader()
                reader.readAsDataURL(path.file)
                reader.onload = function () {
                    imgRef.current.src = reader.result
                }
            }
        }
    }, [path, setPathCurrent])

    useEffect(() => {
        optionRef.current.style.display = "none"
    })

    function removeImage() {
        handleDeleteImage(pathCurrent.path)
    }

    function removeClass() {
        optionRef.current ? optionRef.current.style.display = "none" :
        window.removeEventListener('click', removeClass)
    }

    function handleOption(event) {
        event.stopPropagation()
        optionRef.current && optionRef.current.style.display === "none" ? optionRef.current.style.display = "block" : optionRef.current.style.display = "none"
        window.addEventListener('click', removeClass)
    }

    function handleStopPropagation(e) {
        e.stopPropagation()
    }


    function handleDragStart() {
        imgRef.current.addEventListener('dragover', handleStopPropagation)
        dispatch(setIsDraging({
            type: true,
            position: position
        }))
    }

    function handleDragEnd() {
        imgRef.current && imgRef.current.addEventListener('dragover', handleDrag)
        dispatch(setIsDraging({
            type: false,
            position: undefined
        }))

    }

    return ( <div className='w-full h-full relative'>
    <img ref={imgRef} className='w-full h-full hover:brightness-[0.8]' draggable onDragStart={handleDragStart} onDragEnd={handleDragEnd} src='' alt="" />
    {type === "background" && <div onDragOver={(e) => { e.stopPropagation() }} onClick={(e) => { e.stopPropagation() }} className='cursor-not-allowed px-3 py-1 absolute top-3 left-3 bg-white'>Ảnh bìa</div>}
    <div onDragOver={(e) => { e.stopPropagation() }} onClick={(e) => handleOption(e)} className='absolute top-3 right-3 bg-white rounded-full p-3'>
        <BsThreeDots />
        <div ref={optionRef} style={{display: "none"}}>
            <Tippy removeImage={removeImage} 
                handleChangeImage={() => {
                    fileRef.current.click()
                }} 
                topList={optionList} 
            />
        </div>
    </div>
</div> );
}

export default React.forwardRef(Image);