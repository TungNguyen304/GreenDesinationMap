import { useState, memo } from 'react'
import { BsStarFill, BsStarHalf } from 'react-icons/bs'
import { GrUpdate } from 'react-icons/gr'
import { RiDeleteBin5Fill } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import imageApi from '../../../api/imageApi'
import { useEffect } from 'react'

function ServiceRow({ imageList, place, handleDelete }) {
    const navigate = useNavigate()
    const item = JSON.parse(place)
    const style = {
        "overflow": "hidden",
        "display": "-webkit-box",
        "WebkitBoxOrient": "vertical",
        "WebkitLineClamp": "1"
    }

    function handleNavigateToRoom() {
        localStorage.setItem('service', JSON.stringify(item))
        navigate(`/room/${item.id}`)
    }

    function handleUpdatePlace(event) {
        event.stopPropagation()
        const newImg = imageList.map((item) => {
            return {
                file: item.name,
                key: item.key,
                id: item.id
            }
        })
        const place = {
            ...item,
            "imageList": [...newImg],
            "originImage": [...newImg.map((item) => item.key)]
        }
        sessionStorage.setItem("placeTemporary", JSON.stringify(place))
        sessionStorage.setItem("statusUpdate", "updating")
    }

    return (item &&
        <div>
            <tr onClick={handleNavigateToRoom}>
                <td title={item.name} style={{ display: "flex", flex: "3" }} className='items-center relative'>
                    <div className='mr-3 absolute'>
                        <img className='w-[60px] h-[40px] rounded-lg' src={imageList.length !== 0 ? imageList[0].name : ''} alt="" />
                    </div>
                    <div style={style} className='ml-[80px]'>
                        {item.name}
                    </div>
                </td>
                <td>{!item.status ? "Đang chờ" : "Địa điểm xanh"}</td>
                <td title={item.address} style={{ flex: "3" }}>{item.address}</td>
                <td style={{ display: "flex", alignItems: "center" }}>{
                    (() => {
                        const arr = []
                        let i = Number(item.star)
                        let j = 0
                        while (i !== 0) {
                            j++
                            if (i === 0.5) {
                                arr.push(<BsStarHalf className='text-yellow-600' key={j} />)
                                i = i - 0.5
                            } else {
                                arr.push(<BsStarFill className='text-yellow-600' key={j} />)
                                i--
                            }
                        }
                        return arr
                    })()
                }</td>
                <td>{item.startday}</td>
                <td style={{"textAlign": `${item.browserday ? '' : 'center'}`}}>{item.browserday ? item.browserday : "----"}</td>
                <td>
                    <div onClick={(e) => {e.stopPropagation()}} className='flex items-center'>
                        <Link to="/host/registerservice" onClick={(e) => { handleUpdatePlace(e) }} className='block px-3 py-2 hover:brightness-90 active:scale-95 rounded-lg mr-2 bg-green-400'><GrUpdate /></Link>
                        <button data-placeid={item.id} onClick={(e) => { handleDelete(e) }} className='px-3 py-2 hover:brightness-90 active:scale-95 rounded-lg bg-red-600'><RiDeleteBin5Fill className='pointer-events-none' /></button>
                    </div>
                </td>
            </tr>
        </div>
    );
}



export default memo(ServiceRow);