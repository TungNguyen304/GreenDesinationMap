import serviceApi from "../../../api/serviceApi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useValueContext } from "../../../hook";
import Header from "../../../components/common/Header";
import BigBox from "../../../components/Home/BigBox";
import Navbar from "../../../components/Home/Navbar";
import MapService from "../../../components/Home/MapService";
import { IoArrowBackOutline } from 'react-icons/io5'
import { useState } from "react";
import { useEffect } from "react";

function DetailWishList({type, title}) {
    const { loadRef, handleDisplayBigBox } = useValueContext()
    const [serviceList, setServiceList] = useState([])
    const show = useSelector(state => state.bigboxReducer.show)
    const id = window.location.pathname.replace('/detailwishlist/', '')
    const name = sessionStorage.getItem("interest")
    console.log(name);

    useEffect(() => {
        (async () => {
            const data = await serviceApi.getByWishListId(id)
            loadRef().classList.add("hidden")
            setServiceList(data.data)
        })()
    }, [])

    return (<div>
        <Header />
        <Navbar />
        <div style={{ marginTop: "calc(var(--height_header) + var(--height_navbar) + 50px)" }} className="">
            <MapService isWishList={true} positionList={serviceList} />
        </div>

        <Link to="/wishlist" className="absolute top-6 left-6 z-20 hidden max1029:flex items-center cursor-pointer hover:font-bold active:scale-95">
            <IoArrowBackOutline className="text-xl" />
            <span className="text-lg">Back</span>
        </Link>

        {show && <div>
                <BigBox title={title} type={type} handleDisplayBigBox={handleDisplayBigBox} nameInterest={name}/>
        </div>}
    </div>);
}

export default DetailWishList;