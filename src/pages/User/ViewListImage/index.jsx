import { Fragment, useEffect, useState } from "react";
import imageApi from "../../../api/imageApi";
import { useParams, useNavigate, Link } from "react-router-dom";
import { IoChevronBack } from 'react-icons/io5'

function ViewListImage() {
    const [imageList, setImageList] = useState([])
    const params = useParams()
    let count = 0
    const navigate = useNavigate()
    const isPreviewPage = sessionStorage.getItem('placeTemporary') ? true : false

    useEffect(() => {
        !isPreviewPage ? (async () => {
            const data = await imageApi.getAll()
            setImageList(data.data)
        })() : setImageList([...JSON.parse(sessionStorage.getItem('placeTemporary')).imageList])
    }, [])

    function handleNavigate(event) {
        console.dir(event.target.getAttribute('position'));
        localStorage.setItem('indexImage', event.target.getAttribute('position'))
    }

    return (<div>
        <div className="w-[50%] max477:w-[80%] mx-auto my-6 grid grid-cols-2 ssm639:grid-cols-1 gap-2 pt-2">
            {
            imageList.length !== 0 && imageList.map((item) => {
                if(Number(params.id) === item.placeid || isPreviewPage) {
                    count++
                    return <Link onClick={(e) => handleNavigate(e)} to={`/room/${params.id}/viewimage`} key={isPreviewPage ? count : item.id}>
                    <img className="h-full w-full hover:brightness-[0.8] cursor-pointer" position={count} src={isPreviewPage ? item.file : item.name} alt="" />
                </Link>
                }
                else return <Fragment key={item.id}></Fragment>
            })}
        </div>
        <div onClick={() => {navigate(-1)}} className="py-3 px-6 fixed cursor-pointer top-0 left-0 flex items-center mx-auto rounded-full hover:opacity-90 active:scale-[0.98]">
            <IoChevronBack />
        </div>
    </div>);
}

export default ViewListImage;