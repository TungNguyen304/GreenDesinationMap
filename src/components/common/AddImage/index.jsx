import { FcAddImage } from 'react-icons/fc'
import { useSelector } from 'react-redux'
import { Suspense, useMemo, useRef, useState } from 'react'
import React from 'react'
import { IoCloudUploadOutline } from 'react-icons/io5'
import style from './addimage.module.scss'
import classNames from 'classnames/bind';
import LoaderImage from '../LoaderImage'
const cx = classNames.bind(style)



function AddImage({ type, path, classname, handleUploadImage, handleDeleteImage, position, handleUploadImageDrop, handleSortImage, handleChangeImage }) {
    const Image = useMemo(() => {
        return React.lazy(async () => {
            return new Promise(resolve => setTimeout(resolve, 2000))
                .then(
                    () => import('./Image')
                )
                .catch((error) => {
                    console.log(error);
                })
        });
    }, [path || (path && path.path)])
    const [pathCurrent, setPathCurrent] = useState()
    const optionList = ["Thay đổi", "Xóa"]
    const wrapImageRef = useRef()
    const fileRef = useRef()
    const optionRef = useRef()
    const dragRef = useRef()
    const dropRef = useRef()
    const isDragStart = useSelector(state => state.dragReducer.drag.isDraging)
    const positionDraging = useSelector(state => state.dragReducer.drag.position)

    function handleOnChangeImg(event) {
        if (event.target.files[0] && event.target.files[0].type.includes("image/")) {
            const newPath = URL.createObjectURL(event.target.files[0])
            if (path) {
                handleChangeImage(newPath, event.target.files[0], event.target.files[0].name, position)
            }
            else {
                setPathCurrent(newPath, event.target.files[0], event.target.files[0].name)
                handleUploadImage(newPath, event.target.files[0], event.target.files[0].name)
            }

            if (optionRef.current && ![...optionRef.current.classList].includes('hidden')) {
                optionRef.current.classList.add('hidden')
            }
        }
        else {
            alert("File không hợp lệ, làm ơn chọn ảnh!")
        }
    }

    function handleDrag(event) {
        event.preventDefault()

        if (!path && !isDragStart) {
            dragRef.current.classList.remove('hidden')
            dragRef.current.classList.add('flex')
        }
        if (!path) {
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
                if (path) {
                    handleChangeImage(newPath, file, file.name, position)
                } else {
                    handleUploadImageDrop(newPath, file, file.name, position)
                }
            }
            else {
                alert("File không hợp lệ, làm ơn chọn ảnh!")
            }
        } else if (path) {
            handleSortImage(position, positionDraging)
        }
    }

    return (
        <div ref={dropRef} onDragOver={(e) => handleDrag(e)} onDragLeave={(e) => handleDragLeave(e)} onDrop={(e) => handleDrop(e)} onClick={() => { fileRef.current.click() }} className={`${path ? '' : 'border border-dashed hover:border-solid hover:border-2 border-black'} ${classname || 'h-[210px]'} relative flex justify-center items-center cursor-pointer`}>
            {path ? <Suspense fallback={<LoaderImage />}>
                <Image ref={wrapImageRef} fileRef={fileRef} path={path} setPathCurrent={setPathCurrent} position={position} handleDrag={handleDrag} pathCurrent={pathCurrent} handleDeleteImage={handleDeleteImage} type={type} optionList={optionList} />
            </Suspense> : <FcAddImage className="text-5xl pointer-events-none" />}
            <input ref={fileRef} onChange={(e) => handleOnChangeImg(e)} className='hidden' type="file" name="" id="" />
            <div ref={dragRef} className='pointer-events-none absolute left-0 top-0 w-full h-full bg-[#ffffffcc] hidden flex-col justify-center items-center border-[3px] border-solid border-green-600'>
                <IoCloudUploadOutline className={`text-4xl bg-slate-900 text-white rounded-full ${type ? 'w-[70px] h-[70px]' : 'w-[60px] h-[60px]'} px-3`} />
                <div className={`font-semibold italic mt-3 ${type ? 'text-2xl' : 'text-lg'}`}>Nhả chuột để tải ảnh lên</div>
            </div>
        </div>
    );
}

export default React.memo(AddImage);
