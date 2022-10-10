import { FcAddImage } from 'react-icons/fc'
import { useDispatch, useSelector } from 'react-redux'
import { setIsDraging, setPosition } from '../../../store/actions/drag'
import { useRef, useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { IoCloudUploadOutline } from 'react-icons/io5'
import Tippy from '../Tippy'
import style from './addimage.module.scss'
import classNames from 'classnames/bind';
import { useEffect } from 'react'
const cx = classNames.bind(style)


function AddImage({ type, path, classname, handleUploadImage, handleDeleteImage, position, handleUploadImageDrop, handleSortImage, handleChangeImage}) {
    const [pathCurrent, setPathCurrent] = useState()
    const optionList = ["Thay đổi", "Xóa"]
    const fileRef = useRef()
    const optionRef = useRef()
    const dragRef = useRef()
    const dropRef = useRef()
    const imgRef = useRef()
    const dispatch = useDispatch()
    const isDragStart = useSelector(state => state.dragReducer.drag.isDraging)
    const positionDraging = useSelector(state => state.dragReducer.drag.position)

    useEffect(() => {
        setPathCurrent(path)
    })

    function handleStopPropagation(e) {
        e.stopPropagation()
    }

    function handleOnChangeImg(event) {
        if (event.target.files[0] && event.target.files[0].type.includes("image/")) {
            const newPath = URL.createObjectURL(event.target.files[0])
            if(path) {
                handleChangeImage(newPath, position)
            }
            else {
                setPathCurrent(newPath)
                handleUploadImage(newPath)
            }
            if(![...optionRef.current.classList].includes('hidden')) {
                optionRef.current.classList.add('hidden')
            }
        }
        else {
            alert("File không hợp lệ, làm ơn chọn ảnh!")
        }
    }

    function removeClass() {
        optionRef.current && optionRef.current.classList.add('hidden')
        window.removeEventListener('click', removeClass)
    }

    function handleOption(event) {
        event.stopPropagation()
        optionRef.current && optionRef.current.classList.toggle('hidden')
        window.addEventListener('click', removeClass)
    }

    function removeImage() {
        handleDeleteImage(pathCurrent)
        setPathCurrent('')
    }

    function handleDrag(event) {
        event.preventDefault()

        if (!path && !isDragStart) {
            dragRef.current.classList.remove('hidden')
            dragRef.current.classList.add('flex')
        }
        if (!path)
        {
            dropRef.current.classList.remove('border')
        }

        if (isDragStart)
            dropRef.current.classList.add('border')
    }

    function handleDragLeave(event) {
        event.preventDefault()
        if (!path && !isDragStart) {
            dragRef.current.classList.add('hidden')
            dragRef.current.classList.remove('flex')
        }

        if (!path)
            dropRef.current.classList.add('border')
    }

    function handleDrop(event) {   
        event.preventDefault()
        if (isDragStart === false) {
            dragRef.current.classList.add('hidden')
            dragRef.current.classList.remove('flex')
            if (!path) {
                dropRef.current.classList.add('border')
            }
            if (event.dataTransfer.files[0] && event.dataTransfer.files[0].type.includes("image/")) {
                const file = event.dataTransfer.files[0]
                const newPath = URL.createObjectURL(file)
                if(path) {
                    handleChangeImage(newPath, position)
                } else {
                    handleUploadImageDrop(newPath, position)
                }
            }
            else {
                alert("File không hợp lệ, làm ơn chọn ảnh!")
            }
        } else if(path) {
            handleSortImage(position, positionDraging)
        }
    }

    

    function handleDragStart() {
        imgRef.current.addEventListener('dragover', handleStopPropagation)
        dispatch(setIsDraging({
            type: true,
            position: position
        }))
    }

    function handleDragEnd() {
        imgRef.current.addEventListener('dragover', handleDrag)
        dispatch(setIsDraging({
            type: false,
            position: undefined
        }))

    }


    return (
        <div ref={dropRef} onDragOver={(e) => handleDrag(e)} onDragLeave={(e) => handleDragLeave(e)} onDrop={(e) => handleDrop(e)} onClick={() => { fileRef.current.click() }} className={`${path ? '' : 'border border-dashed hover:border-solid hover:border-2 border-black'} ${classname || 'h-[210px]'} relative flex justify-center items-center cursor-pointer`}>
            {path ? <div className='w-full h-full relative'>
                <img ref={imgRef} className='w-full h-full hover:brightness-[0.8]' draggable onDragStart={handleDragStart} onDragEnd={handleDragEnd} src={path} alt="" />
                {type === "background" && <div onDragOver={(e) => { e.stopPropagation() }} onClick={(e) => { e.stopPropagation() }} className='cursor-not-allowed px-3 py-1 absolute top-3 left-3 bg-white'>Ảnh bìa</div>}
                <div onDragOver={(e) => { e.stopPropagation() }} onClick={(e) => handleOption(e)} className='absolute top-3 right-3 bg-white rounded-full p-3'>
                    <BsThreeDots />
                    <div ref={optionRef} className='hidden'>
                        <Tippy removeImage={removeImage} handleChangeImage={() => { fileRef.current.click()}} topList={optionList} />
                    </div>
                </div>
            </div> : <FcAddImage className="text-5xl pointer-events-none" />}
            <input ref={fileRef} onChange={(e) => handleOnChangeImg(e)} className='hidden' type="file" name="" id="" />
            <div ref={dragRef} className='pointer-events-none absolute left-0 top-0 w-full h-full bg-[#ffffffcc] hidden flex-col justify-center items-center border-[3px] border-solid border-green-600'>
                <IoCloudUploadOutline className={`text-4xl bg-slate-900 text-white rounded-full ${type ? 'w-[70px] h-[70px]' : 'w-[60px] h-[60px]'} px-3`} />
                <div className={`font-semibold italic mt-3 ${type ? 'text-2xl' : 'text-lg'}`}>Nhả chuột để tải ảnh lên</div>
            </div>
        </div>
    );
}

export default AddImage;
