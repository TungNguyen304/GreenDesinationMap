import { Fragment, useEffect, useState } from "react";
import imageApi from "../../../api/imageApi";
import { useParams, useNavigate, Link } from "react-router-dom";
import { IoMdArrowRoundBack } from 'react-icons/io'

function ViewListImage() {
    const [imageList, setImageList] = useState([])
    const params = useParams()
    const navigate = useNavigate()
    const isPreviewPage = localStorage.getItem('placeTemporary') ? true : false

    useEffect(() => {
        !isPreviewPage ? (async () => {
            const data = await imageApi.getAll()
            setImageList(data.data)
        })() : setImageList([...JSON.parse(localStorage.getItem('placeTemporary')).imageList])
    }, [])

    function handleNavigate(index, event) {
        localStorage.setItem('indexImage', index+1)
    }

    return (<div>
        <div className="w-[50%] mx-auto my-5 grid grid-cols-2 gap-2 pt-2">
            {imageList.length !== 0 && imageList.map((item, index) => {
                if(Number(params.id) === item.placeid || isPreviewPage) {
                    return <Link onClick={(e) => handleNavigate(index, e)} to={`/room/${params.id}/viewimage`} key={isPreviewPage ? index : item.id}>
                    <img className="h-full w-full hover:brightness-[0.8] cursor-pointer" src={isPreviewPage ? item.path : item.name} alt="" />
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