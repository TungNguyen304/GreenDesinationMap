import { Fragment, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { IoChevronBack } from 'react-icons/io5'

function ViewListImage() {
    const params = useParams()
    let count = 0
    const navigate = useNavigate()
    const isPreviewPage = sessionStorage.getItem('placeTemporary') ? true : false
    let imageList
    if (isPreviewPage) {
        imageList = JSON.parse(sessionStorage.getItem('placeTemporary')).imageList
    }
    else {
        imageList = JSON.parse(localStorage.getItem('service')).imagesCollection
    }
    function handleNavigate(event) {
        localStorage.setItem('indexImage', event.target.getAttribute('position'))
    }

    return (<div>
        <div className="w-[50%] max477:w-[80%] mx-auto my-6 grid grid-cols-2 ssm639:grid-cols-1 gap-2 pt-2">
            {
                imageList && imageList.length > 0 && imageList.map((item) => {
                    count++
                    return <Link onClick={(e) => handleNavigate(e)} to={`/room/${params.id}/viewimage`} key={isPreviewPage ? count : item.id}>
                        <img className="h-full w-full hover:brightness-[0.8] cursor-pointer" position={count} src={isPreviewPage ? item.file : item.name} alt="" />
                    </Link>
                })}
        </div>
        <div onClick={() => { navigate(-1) }} className="py-3 px-6 fixed cursor-pointer top-0 left-0 flex items-center mx-auto rounded-full hover:opacity-90 active:scale-[0.98]">
            <IoChevronBack />
        </div>
    </div>);
}

export default ViewListImage;