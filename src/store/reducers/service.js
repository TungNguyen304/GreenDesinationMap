import {SiBuymeacoffee, SiRiotgames, SiCinema4D} from 'react-icons/si'
import {IoRestaurantSharp, IoBoatSharp} from 'react-icons/io5'
import {TbBeach} from 'react-icons/tb'
import {GiIsland, GiWaterfall, GiForest, GiCableStayedBridge, GiShop} from 'react-icons/gi'
import {MdOutlineMuseum, MdPark} from 'react-icons/md'
import {FaSwimmingPool, FaHotjar, FaHotel} from 'react-icons/fa'

const initState = {
    serviceType: 'noibat',
    serviceRegisterType: '',
    service: {},
    serviceComponent: [
        {
            type: "noibat",
            name: "Nổi bật",
            Component: FaHotjar
        },
        {
            type: "cafe",
            name: "Quán cafe, trà sửa",
            Component: SiBuymeacoffee
        },
        {
            type: "restaurant",
            name: "Nhà hàng, quán ăn",
            Component: IoRestaurantSharp
        },
        {
            type: "hotel",
            name: "Khách sạn, nhà nghỉ",
            Component: FaHotel
        },
        {
            type: "baibien",
            name: "Bãi biển",
            Component: TbBeach
        },
        {
            type: "congvien",
            name: "Công viên",
            Component: MdPark
        },
        {
            type: "hondao",
            name: "Hòn đảo",
            Component: GiIsland
        },
        {
            type: "songsuoi",
            name: "Sông, suối",
            Component: GiWaterfall
        },
        {
            type: "nuidoi",
            name: "Núi đồi",
            Component: GiForest
        },
        {
            type: "baotang",
            name: "Bảo tàng",
            Component: MdOutlineMuseum
        },
        {
            type: "duthuyen",
            name: "Du thuyền",
            Component: IoBoatSharp
        },
        {
            type: "hoboi",
            name: "Hồ bơi",
            Component: FaSwimmingPool
        },
        {
            type: "cauthap",
            name: "Cầu, tháp",
            Component: GiCableStayedBridge
        },
        {
            type: "khuvuichoi",
            name: "Khu vui chơi",
            Component: SiRiotgames
        },
        {
            type: "rapphim",
            name: "Rạp phim",
            Component: SiCinema4D
        },
        {
            type: "sieuthi",
            name: "Siêu thị, chợ",
            Component: GiShop
        },
    ],
}

const serviceReducer = (state=initState, action) => {
    switch(action.type) {
        case 'SET_SERVICE_TYPE': 
        {
            const newType = action.payload
            return {
                ...state,
                serviceType: newType
            }
        }
        case 'SET_SERVICE_REGISTER_TYPE': 
        {
            const newType = action.payload
            return {
                ...state,
                serviceRegisterType: newType
            }
        }
        case 'SET_SERVICE': 
        {
            const service = action.payload
            return {
                ...state,
                service: {...service}
            }
        }
        default : return state
    }
}

export {serviceReducer}