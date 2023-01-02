import { useEffect } from 'react';
import { useRef } from 'react';
import { MdChevronLeft } from 'react-icons/md'
import { Link } from "react-router-dom";

function FormLocation({ amenity, type, tourism, road, name, house_number, suburb, city_district, city, setSelectPosition, selectPosition, save}) {
    const formRef = useRef()
    function handleDispatchValue(selectPosition) {
        if (!save) {
            const currdentData = JSON.parse(sessionStorage.getItem('placeTemporary'))
            sessionStorage.setItem('placeTemporary', JSON.stringify({
                ...currdentData,
                name: selectPosition.type === 'hotel' ? selectPosition.address.tourism : selectPosition.address.amenity,
                road: selectPosition.address.house_number ? selectPosition.address.house_number + ', ' + selectPosition.address.road : selectPosition.address.road,
                ward: selectPosition.address.suburb,
                district: selectPosition.address.city_district,
                city: selectPosition.address.city,
                lat: selectPosition.lat,
                lon: selectPosition.lon,
                type: selectPosition.type,
                mapid: selectPosition.place_id
            }))
        }
    }
    useEffect(() => {
        if(!save)
        formRef.current.classList.remove('hidden');
    })

    return (<div ref={formRef} className="absolute top-[50%] translate-y-[-50%] w-full left-0 px-20 max1024:px-5">
        <div className="bg-white rounded-2xl p-6">
            <div className="flex items-center mb-6">
                <MdChevronLeft onClick={() => {
                    if (save) {
                        formRef.current.classList.add('hidden');
                    }
                    setSelectPosition(null);
                }} className="text-3xl hover:bg-slate-100 rounded-full active:scale-90 cursor-pointer" />
                <div className="flex justify-center flex-1 text-xl font-semibold italic"><span>Xác nhận địa chỉ của bạn</span></div>
            </div>

            <div className="border-[1.5px] border-solid border-[#c0bebe] rounded-lg">
                {(amenity || name || tourism) && <div className="p-3 flex flex-col border-b-[1.5px] border-solid border-[#c0bebe]">
                    <label className="text-[#717171] text-xs" htmlFor="name">Tên</label>
                    <input readOnly id="name" type="text" value={save ? name : type === 'hotel' ? tourism : amenity} />
                </div>}
                {road && <div className="p-3 flex flex-col border-b-[1.5px] border-solid border-[#c0bebe]">
                    <label className="text-[#717171] text-xs" htmlFor="street">Số nhà, Đường</label>
                    <input readOnly id="street" type="text" value={save ? road : house_number ? house_number + ', ' + road : road} />
                </div>}
                {suburb && <div className="p-3 flex flex-col border-b-[1.5px] border-solid border-[#c0bebe]">
                    <label className="text-[#717171] text-xs" htmlFor="ward">Phường/Xã</label>
                    <input readOnly id="ward" type="text" value={suburb} />
                </div>}
                {city_district && <div className="p-3 flex flex-col border-b-[1.5px] border-solid border-[#c0bebe]">
                    <label className="text-[#717171] text-xs" htmlFor="district">Quận/Huyện</label>
                    <input readOnly id="district" type="text" value={city_district} />
                </div>}
                <div className="p-3 flex flex-col">
                    <label className="text-[#717171] text-xs" htmlFor="city">Thành phố</label>
                    <input readOnly id="city" type="text" value={city} />
                </div>
            </div>

            <Link onClick={() => { handleDispatchValue(selectPosition) }} to="/host/registerservice/providephotos" style={{ "backgroundImage": "linear-gradient(to right, #07D5DF, #7F6DEF, #F408FE)" }} className="text-center block rounded-full cursor-pointer text-white italic font-medium px-3 py-2 hover:brightness-90 active:scale-[0.98] mt-5">Xác nhận để lưu và đến bược tiếp theo</Link>
        </div>
    </div>);
}

export default FormLocation;