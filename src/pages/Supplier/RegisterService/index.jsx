import { useSelector } from "react-redux";
import { MdKeyboardArrowRight } from 'react-icons/md'
import { useDispatch } from "react-redux";
import { setServiceRegisterType } from "../../../store/actions/service";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import { useEffect } from "react";

function RegisterService() {
    const serviceList = useSelector(state => state.serviceReducer.serviceComponent)
    const dispatch = useDispatch()
    const service = JSON.parse(sessionStorage.getItem('placeTemporary'))

    function handleDispatchValue(type) {
        if(!service || service.type !== type) {
            sessionStorage.setItem('placeTemporary', JSON.stringify({
                type: type
            }))
            dispatch(setServiceRegisterType(type))
        }
    }

    return (<div>
        <div className="flex h-[100vh] relative">
            <div style={{ "backgroundImage": "linear-gradient(to top, #441EA5, #CE247A)" }} className="w-[50%] justify-center items-center px-10 sm:flex hidden">
                <div className="text-6xl font-bold text-white italic">Chọn loại dịch vụ bạn muốn đăng ký</div>
            </div>
            <div className="w-full sm:bg-white sm:w-[50%] h-full flex flex-col justify-center items-center px-10 max299:px-3 relative">
                <div className="w-full">
                    <div className="text-2xl font-medium mb-8">
                        Chọn loại dịch vụ bạn muốn đăng ký
                    </div>
                    <div>
                        {serviceList && serviceList.map((item, index) => {
                            if (item.type === 'cafe' || item.type === 'restaurant' || item.type === 'hotel') {
                                let Component = item.Component
                                return (<Link key={index} to={`/host/registerservice/location/${item.type}`} onClick={() => handleDispatchValue(item.type)} className={`flex items-center justify-between px-5 py-6 border-2 border-solid ${service && service.type === item.type ? 'border-green-600 bg-green-600' : 'border-[#ccc]'}  my-3 rounded-xl cursor-pointer hover:border-black`}>
                                    <div className="flex items-center">
                                        <div className="bg-slate-400 p-3 rounded-xl">
                                            <Component />
                                        </div>
                                        <div className="ml-4 font-medium italic">
                                            {item.name}
                                        </div>
                                    </div>
                                    <div>
                                        <MdKeyboardArrowRight />
                                    </div>
                                </Link>)
                            }
                            else return <Fragment key={index}></Fragment>
                        })}
                    </div>
                </div>
            </div>

            <Link onClick={() => {sessionStorage.removeItem('placeTemporary')}} to='/host' className="fixed top-4 right-4 text-sm italic bg-slate-50 px-3 py-1 rounded-lg cursor-pointer hover:brightness-95 active:scale-95 select-none">Thoát</Link>
        </div>
    </div>);
}

export default RegisterService;