import Map from "../../../components/common/Map";
import SearchBar from "../../../components/common/Header/SearchBar";
import { Link } from "react-router-dom";
import FormLocation from "../../../components/common/FormLocation";
import { useState } from "react";
import { useParams } from "react-router-dom";

function Location() {
    const [selectPosition, setSelectPosition] = useState()
    const service = JSON.parse(sessionStorage.getItem('placeTemporary'))
    const style = useParams()

    function handleRegisterLocation(service) {
        if (service.type !== style.style) {
            alert(`Loại địa điểm bạn đang chọn không phải là ${style.style}`)
        }
        else {
            setSelectPosition(service)
        }
    }


    return (<div style={{ fontFamily: "sans-serif" }}>
        <div className="flex h-[100vh] relative">
            <div style={{ "backgroundImage": "linear-gradient(to top, #441EA5, #CE247A)" }} className="w-[50%] flex justify-center items-center px-10">
                <div className="text-6xl font-bold text-white italic">Hãy xác định vị trí của bạn</div>
            </div>
            <div className="w-[50%] h-full flex flex-col justify-center items-center relative">
                <Map />
                <div className="absolute top-[50%] translate-y-[-50%] w-full left-0 ">
                    <div className="w-[70%] mx-auto bg-transparent">
                        <SearchBar handleRegisterLocation={handleRegisterLocation} />
                    </div>
                </div>
                {selectPosition ?
                    <FormLocation selectPosition={selectPosition} setSelectPosition={setSelectPosition} amenity={selectPosition.address.amenity} type={selectPosition.type}
                        tourism={selectPosition.address.tourism} house_number={selectPosition.address.house_number} road={selectPosition.address.road}
                        suburb={selectPosition.address.suburb} city_district={selectPosition.address.city_district} city={selectPosition.address.city} />
                    :
                    !selectPosition && service.name &&
                    <FormLocation save={true} selectPosition={service} setSelectPosition={setSelectPosition} name={service.name} type={service.type}
                        road={service.road} suburb={service.ward} city_district={service.district} city={service.city} />
                }

            </div>

            <Link onClick={() => { sessionStorage.removeItem('placeTemporary') }} to='/host' className="fixed top-4 right-4 text-sm italic bg-slate-50 px-3 py-1 rounded-lg cursor-pointer hover:brightness-95 active:scale-95 select-none">Thoát</Link>
            <Link to='/host/registerservice' style={{ "backgroundImage": "linear-gradient(to right, #07D5DF, #7F6DEF, #F408FE)" }} className="fixed bottom-8 left-[55%] italic text-white px-6 py-2 font-semibold rounded-lg cursor-pointer hover:brightness-95 active:scale-95 select-none">Quay lại</Link>

        </div>
    </div>);
}

export default Location;