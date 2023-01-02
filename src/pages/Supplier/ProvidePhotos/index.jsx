import { Link, Navigate } from "react-router-dom";
import ImagesIcon from '../../../assets/logo/ImagesIcon.svg'
import style from './providephotos.module.scss'
import AddImage from "../../../components/common/AddImage";
import classNames from 'classnames/bind';
import { ImUpload } from 'react-icons/im'
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
const cx = classNames.bind(style)

function ProvidePhotos() {
    const [pathList, setPathList] = useState([])
    const [length, setLength] = useState(5)
    const fileRef = useRef()
    const fileRef2 = useRef()
    const dropRef = useRef()
    const wrapDropRef = useRef()
    const nextRef = useRef()
    const service = JSON.parse(sessionStorage.getItem('placeTemporary'))
    useEffect(() => {
        if (service.imageList) {
            setPathList([...service.imageList])
            setLength(service.imageList.length + 1)
        }
    }, [])

    function handleOnChangeImg(event) {
        if (event.target.files[0] && event.target.files[0].type.includes("image/")) {
            const newPath = URL.createObjectURL(event.target.files[0])
            setPathList([...pathList, {
                path: newPath,
                file: event.target.files[0],
                name: event.target.files[0].name
            }])
        }
        else {
            alert("File không hợp lệ, làm ơn chọn ảnh!")
        }
    }

    function handleUploadImage(path, file, name) {
        setPathList([...pathList, {
            path: path,
            file: file,
            name: name
        }])
    }

    function handleUploadImageDrop(path, file, name, position) {
        pathList.splice(position, 0, {
            path: path,
            file: file,
            name: name
        })
        setPathList([...pathList])
    }

    function handleChangeImage(path, file, name, position) {
        pathList[position] = {
            path: path,
            file: file,
            name: name
        }
        setPathList([...pathList])
    }

    function handleSortImage(position1, position2) {
        const path1 = pathList[position1]
        const path2 = pathList[position2]

        pathList[position2] = path1
        pathList[position1] = path2

        setPathList([...pathList])
    }

    function handleDeleteImage(path, exits) {
        const newPathList = pathList.filter((item) => {
            if (exits) {
                if (!item.key) return true
                else return item.key !== path
            } else {
                if (item.key) return true
                else return item.path !== path
            }
        })
        setPathList([...newPathList])
    }

    useEffect(() => {
        if ((pathList.length === 5 && length !== 7) || pathList.length === length) {
            setLength(length + 1)
        }
        else if (length > 5 && length - pathList.length === 2) {
            setLength(length - 1)
        }
        if (pathList.length < 5) {
            nextRef.current.classList.add('pointer-events-none')
            nextRef.current.style.backgroundImage = "unset"
        }
        else {
            nextRef.current.classList.remove('pointer-events-none')
            nextRef.current.style.backgroundImage = "linear-gradient(to right, #07D5DF, #7F6DEF, #F408FE)"
        }

    }, [pathList.length])

    function handleDrag(event) {
        event.preventDefault()
        dropRef.current.classList.add(style.drop)
        const divList = dropRef.current.querySelectorAll('div')
        const h2 = dropRef.current.querySelector('h2')
        h2.classList.remove('hidden')
        divList.forEach((item) => {
            item.classList.add('hidden')
        })

    }

    function handleDragLeave(event) {
        dropRef.current.classList.remove(style.drop)
        const divList = dropRef.current.querySelectorAll('div')
        const h2 = dropRef.current.querySelector('h2')
        h2.classList.add('hidden')
        divList.forEach((item) => {
            item.classList.remove('hidden')
        })


    }

    function handleDrop(event) {
        event.preventDefault()
        if (event.dataTransfer.files[0] && event.dataTransfer.files[0].type.includes("image/")) {
            const file = event.dataTransfer.files[0]
            const newPath = URL.createObjectURL(file)
            setPathList((prev) => [...prev, {
                path: newPath,
                file: file,
                name: file.name
            }])
        } else {
            alert("File không hợp lệ, làm ơn chọn ảnh!")
        }
    }

    function handleDispatchValue(pathList, event) {
        if (JSON.stringify(pathList) !== JSON.stringify(service.imageList)) {
            pathList.forEach((item) => {
                if (typeof item.file !== 'string') {
                    var reader = new FileReader()
                    reader.readAsDataURL(item.file)
                    reader.onload = function () {
                        item.file = reader.result
                    }
                }
            })
            const interval = setInterval(() => {
                if (pathList.every((item) => {
                    return item.file !== {}
                })) {
                    clearInterval(interval)
                }
                sessionStorage.setItem('placeTemporary', JSON.stringify({
                    ...service,
                    imageList: [...pathList]
                }))
            }, 500)
        }

    }

    return (<div>
        <div className={`flex h-[100vh] relative ${cx('wrap_add_image')}`}>
            <div style={{ "backgroundImage": "linear-gradient(to top, #441EA5, #CE247A)" }} className="w-[50%] max866:hidden flex justify-center items-center px-10">
                <div className="text-6xl font-bold text-white italic">Tiếp theo, hãy cung cấp một số ảnh chụp về địa điểm của bạn</div>
            </div>
            <div className="max866:w-full w-[50%] h-full flex flex-col justify-center items-center px-10 max477:px-1 relative">
                <div className={`w-full ${pathList.length ? 'px-5' : 'min1200:px-20 px-0'}`}>
                    {pathList.length !== 0 && <div className="flex max350:flex-col max350:text-center items-center justify-between mb-3">
                        <div className="">
                            <div className="text-2xl font-semibold">Thêm ít nhất 5 ảnh</div>
                            <div className="text-[#717171] text-lg">Kéo để sắp xếp lại</div>
                        </div>
                        <div onClick={() => { fileRef2.current.click() }} className="flex items-center border border-solid border-black px-3 py-2 cursor-pointer hover:bg-slate-100 active:scale-95 rounded-lg">
                            <ImUpload className="mr-2" />
                            <div>Tải lên</div>
                            <input onChange={(e) => handleOnChangeImg(e)} className="hidden" ref={fileRef2} type="file" />
                        </div>
                    </div>}
                    <div ref={wrapDropRef} className={`h-[65vh] max866:h-[55vh] overflow-y-scroll ${pathList.length ? '' : 'flex justify-center items-center'} ${cx('add_image')}`}>
                        {pathList.length ?
                            <div className="w-full pr-2 relative">
                                <div>
                                    <div>
                                        <AddImage type="background" classname="w-full h-[420px]" path={pathList[0]} position={0} handleChangeImage={handleChangeImage} handleUploadImage={handleUploadImage} handleDeleteImage={handleDeleteImage} handleUploadImageDrop={handleUploadImageDrop} handleSortImage={handleSortImage} />
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 mt-2 min867max1100:grid-cols-1 ssm639:grid-cols-1">
                                        {
                                            (() => {
                                                const arr = []
                                                let i = 1
                                                for (i; i < length; i++) {
                                                    arr.push(<AddImage key={i} path={pathList[i]} position={i} handleChangeImage={handleChangeImage} handleUploadImage={handleUploadImage} handleDeleteImage={handleDeleteImage} handleUploadImageDrop={handleUploadImageDrop} handleSortImage={handleSortImage} />)
                                                }
                                                return arr
                                            })()
                                        }
                                    </div>
                                </div>
                            </div> :
                            <div ref={dropRef} onDragOver={(e) => handleDrag(e)} onDragLeave={(e) => handleDragLeave(e)} onDrop={(e) => handleDrop(e)} className={`mr-3 flex flex-col justify-center items-center h-full w-full border border-dashed border-black`}>
                                <img className="w-[60px] h-[60px]" src={ImagesIcon} alt="" />
                                <h2 className="hidden text-2xl font-semibold">Nhả chuột để tải ảnh lên</h2>
                                <div className="text-2xl font-semibold max299:text-center">Kéo ảnh của bạn vào đây</div>
                                <div className="text-lg mt-3">Thêm ít nhất 5 ảnh</div>
                                <input onChange={(e) => { handleOnChangeImg(e) }} ref={fileRef} className="hidden" type="file" />
                                <div onClick={() => { fileRef.current.click() }} className="mt-20 underline font-semibold text-sm">Tải lên từ thiết bị của bạn</div>
                            </div>}

                    </div>
                </div>
            </div>

            <Link onClick={() => { sessionStorage.removeItem('placeTemporary') }} to='/host' className="z-10 fixed top-4 right-4 text-sm italic bg-slate-50 px-3 py-1 rounded-lg cursor-pointer hover:brightness-95 active:scale-95 select-none">Thoát</Link>
            <Link to={`/host/registerservice/location/${service.type}`} style={{ "backgroundImage": "linear-gradient(to right, #07D5DF, #7F6DEF, #F408FE)" }} className="z-10 fixed bottom-8 max866:bottom-14 left-[55%] max866:left-[50%] max866:translate-x-[-50%] max505:w-[90%] italic text-white px-6 py-2 font-semibold rounded-lg cursor-pointer hover:brightness-95 active:scale-95 select-none">Quay lại</Link>
            <Link onClick={(e) => { handleDispatchValue(pathList, e) }} ref={nextRef} to='/host/registerservice/providetitle' style={{ "backgroundImage": "" }} className="bg-[#DDDDDD] z-10 fixed bottom-8 max866:bottom-2 right-8 max866:left-[50%] max866:translate-x-[-50%] italic max505:w-[90%] max505:text-start text-center text-white px-6 py-2 font-semibold rounded-lg cursor-pointer hover:brightness-95 active:scale-95 select-none pointer-events-none">Lưu và đến bước tiếp theo</Link>
        </div>
    </div>);
}

export default ProvidePhotos;