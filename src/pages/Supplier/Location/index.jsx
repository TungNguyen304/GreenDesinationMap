import Map from "../../../components/common/Map";
import SearchBar from "../../../components/common/Header/SearchBar";
import { Link } from "react-router-dom";
import { MdChevronLeft } from 'react-icons/md'
import { useRef } from "react";
import { useState } from "react";

function Location() {
    const formRef = useRef()
    const [selectPosition, setSelectPosition] = useState()

    function handleRegisterLocation(service, type) {
        if(service.type !== type) {
            alert(`Loại địa điểm bạn đang chọn không phải là ${type}`)
        }
        else {
            setSelectPosition(service)
        }
    }
    console.log(selectPosition);

    return (<div style={{fontFamily: "sans-serif"}}>
        <div className="flex h-[100vh] relative">
            <div style={{ "backgroundImage": "linear-gradient(to top, #441EA5, #CE247A)" }} className="w-[50%] flex justify-center items-center px-10">
                <div className="text-6xl font-bold text-white italic">Hãy xác định vị trí của bạn</div>
            </div>
            <div className="w-[50%] h-full flex flex-col justify-center items-center relative">
                <Map />
                <div className="absolute top-[50%] translate-y-[-50%] w-full left-0 ">
                    <div className="w-[70%] mx-auto bg-transparent">
                        <SearchBar handleRegisterLocation={handleRegisterLocation}/>
                    </div>
                </div>
                {selectPosition && <div ref={formRef} className="absolute top-[50%] translate-y-[-50%] w-full left-0 px-20">
                    <div className="bg-white rounded-2xl p-6">
                        <div className="flex items-center mb-6">
                            <MdChevronLeft onClick={() => {setSelectPosition(null)}} className="text-3xl hover:bg-slate-100 rounded-full active:scale-90 cursor-pointer"/>
                            <div className="flex justify-center flex-1 text-xl font-semibold italic"><span>Xác nhận địa chỉ của bạn</span></div>
                        </div>

                        <div className="border-[1.5px] border-solid border-[#c0bebe] rounded-lg">
                            {selectPosition.address.amenity && <div className="p-3 flex flex-col border-b-[1.5px] border-solid border-[#c0bebe]">
                                <label className="text-[#717171] text-xs" htmlFor="name">Tên</label>
                                <input readOnly id="name" type="text" value={selectPosition.type==='hotel' ? selectPosition.address.tourism : selectPosition.address.amenity} />
                            </div>}
                            {selectPosition.address.road && <div className="p-3 flex flex-col border-b-[1.5px] border-solid border-[#c0bebe]">
                                <label className="text-[#717171] text-xs" htmlFor="street">Số nhà, Đường</label>
                                <input readOnly id="street" type="text" value={selectPosition.address.house_number ? selectPosition.address.house_number + ', ' + selectPosition.address.road : selectPosition.address.road} />
                            </div>}
                            {selectPosition.address.suburb && <div className="p-3 flex flex-col border-b-[1.5px] border-solid border-[#c0bebe]">
                                <label className="text-[#717171] text-xs" htmlFor="ward">Phường/Xã</label>
                                <input readOnly id="ward" type="text" value={selectPosition.address.suburb} />
                            </div>}
                            {selectPosition.address.city_district && <div className="p-3 flex flex-col border-b-[1.5px] border-solid border-[#c0bebe]">
                                <label className="text-[#717171] text-xs" htmlFor="district">Quận/Huyện</label>
                                <input readOnly id="district" type="text" value={selectPosition.address.city_district} />
                            </div>}
                            <div className="p-3 flex flex-col">
                                <label className="text-[#717171] text-xs" htmlFor="city">Thành phố</label>
                                <input readOnly id="city" type="text" value={selectPosition.address.city} />
                            </div>
                        </div>

                        <Link to="/host/registerservice/providephotos" style={{"backgroundImage": "linear-gradient(to right, #07D5DF, #7F6DEF, #F408FE)"}} className="text-center block rounded-full cursor-pointer text-white italic font-medium px-3 py-2 hover:brightness-90 active:scale-[0.98] mt-5">Xác nhận để đến bược tiếp theo</Link>
                    </div>
                </div>}
            </div>

            <Link to='/host' className="fixed top-4 right-4 text-sm italic bg-slate-50 px-3 py-1 rounded-lg cursor-pointer hover:brightness-95 active:scale-95 select-none">Thoát</Link>
            <Link to='/host/registerservice' style={{"backgroundImage": "linear-gradient(to right, #07D5DF, #7F6DEF, #F408FE)"}} className="fixed bottom-8 left-[55%] italic text-white px-6 py-2 font-semibold rounded-lg cursor-pointer hover:brightness-95 active:scale-95 select-none">Quay lại</Link>

        </div>
    </div>);
}

export default Location;