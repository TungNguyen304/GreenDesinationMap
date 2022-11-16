import { useState } from 'react'
import { BsStarFill, BsStarHalf } from 'react-icons/bs'
import { GrUpdate } from 'react-icons/gr'
import { RiDeleteBin5Fill } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import imageApi from '../../../api/imageApi'
import { useEffect } from 'react'

function ServiceRow({ item }) {
    const navigate = useNavigate()
    const [imageList, setImageList] = useState([])
    const style = {
        "overflow": "hidden",
        "display": "-webkit-box",
        "WebkitBoxOrient": "vertical",
        "WebkitLineClamp": "1"
    }

    useEffect(() => {
        (async () => {
            const data = await imageApi.get(item.id)
            setImageList(data.data)
        })()
    }, [item.id])

    function handleNavigateToRoom() {
        localStorage.setItem('service', JSON.stringify(item))
        navigate(`/room/${item.id}`)
    }

    function handleUpdatePlace(event) {
        event.stopPropagation()
        const newImg = imageList.map((item) => {
            return {
                file: item.name,
                id: item.id
            }
        })
        const place = {
            ...item,
            "imageList": [...newImg]
        }
        sessionStorage.setItem("placeTemporary", JSON.stringify(place))
        sessionStorage.setItem("statusUpdate", "updating")
        navigate(`/host/registerservice`)
    }

    return (item && 
        <tr onClick={handleNavigateToRoom}>
        <td title={item.name} style={{ display: "flex", flex: "3" }} className='items-center relative'>
            <div className='mr-3 absolute'>
                <img className='w-[60px] h-[40px] rounded-lg' src={imageList.length!==0 ? imageList[0].name : ''} alt="" />
            </div>
            <div style={style} className='ml-[80px]'>
                {item.name}
            </div>
        </td>
        <td>{item.status === "0" ? "Đang chờ" : "Địa điểm xanh"}</td>
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
        <td className={`${item.browserday ? '' : ''}`}>{item.browserday ? item.browserday : "----"}</td>
        <td>
            <div>
                <button onClick={(e) => {handleUpdatePlace(e)}} className='px-3 py-2 hover:brightness-90 active:scale-95 rounded-lg mr-2 bg-green-400'><GrUpdate /></button>
                <button className='px-3 py-2 hover:brightness-90 active:scale-95 rounded-lg bg-red-600'><RiDeleteBin5Fill /></button>
            </div>
        </td>
    </tr>
    );
}



export default ServiceRow;