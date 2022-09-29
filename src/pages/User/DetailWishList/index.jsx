import interestApi from "../../../api/interestApi";
import serviceApi from "../../../api/serviceApi";
import Header from "../../../components/common/Header";
import MapService from "../../../components/Home/MapService";
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
        <div style={{marginTop: "var(--height_header)"}} className="">
            <MapService positionList={serviceList}/>
        </div>
    </div> );
}

export default DetailWishList;