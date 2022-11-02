import interestApi from "../../../api/interestApi";
import serviceApi from "../../../api/serviceApi";
import { Link } from "react-router-dom";
import Header from "../../../components/common/Header";
import Navbar from "../../../components/Home/Navbar";
import MapService from "../../../components/Home/MapService";
import {IoArrowBackOutline} from 'react-icons/io5'
import { useState } from "react";
import { useEffect } from "react";

function DetailWishList() {
    const [interestList, setInterestList] = useState([])
    const [serviceList, setServiceList] = useState([])
    
    const id = window.location.pathname.replace('/detailwishlist/', '')
    
    useEffect(() => {
        (async() => {
            const interest = await interestApi.get(id)
            const data = await interestApi.get(`?name=${interest.data.name}`)
            setInterestList(data.data)
        })()
    }, [])

    useEffect(() => {
        (async() => {
            const data = await serviceApi.getAll()
            const filterService = data.data.filter((item1) => {
                return interestList.some((item2) => {
                    return item1.id === item2.placeid
                })
            })
            setServiceList(filterService)    
        })()
    }, [interestList])

    return ( <div>
        <Header/>
        <Navbar/>
        <div style={{marginTop: "calc(var(--height_header) + var(--height_navbar) + 50px)"}} className="">
            <MapService positionList={serviceList}/>
        </div>

        <Link to="/wishlist" className="absolute top-6 left-6 z-20 hidden max1029:flex items-center cursor-pointer hover:font-bold active:scale-95">
            <IoArrowBackOutline className="text-xl"/>
            <span className="text-lg">Back</span>
        </Link>
    </div> );
}

export default DetailWishList;