import { Fragment, useEffect, useState } from "react";
import imageApi from "../../../api/imageApi";
import { useParams, useNavigate, Link } from "react-router-dom";
import { IoMdArrowRoundBack } from 'react-icons/io'

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
        <div className="w-[50%] mx-auto my-5 grid grid-cols-2 gap-2 pt-2">
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
        <div onClick={() => {navigate(-1)}} style={{ "backgroundImage": "linear-gradient(to right, #07D5DF, #7F6DEF, #F408FE)" }} className="text-white py-3 px-6 fixed top-[100px] cursor-pointer left-[20px] flex items-center mx-auto rounded-full hover:opacity-90 active:scale-[0.98]">
            <IoMdArrowRoundBack/>
            <span>Back</span>
        </div>
    </div>);
}

export default ViewListImage;