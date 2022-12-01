import { useEffect } from 'react';
import { AiOutlinePlus } from 'react-icons/ai'
import { useValueContext } from '../../../../hook';
import interestApi from '../../../../api/interestApi';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import style from './interest.module.scss'
import classNames from 'classnames/bind';
import Loader from '../../../common/Loader';
import { useRef } from 'react';
const cx = classNames.bind(style)

function Interests() {
    const data = useSelector(state => state.serviceReducer.service)
    const serviceInterest = useSelector(state => state.serviceReducer.serviceInterest)
    const [interest, setInterest] = useState([])
    const value = useValueContext()
    const loadRef = useRef()
    const showRef = useRef()
    const account = useSelector(state => state.accountReducer).user

    useEffect(() => {
        (async () => {
            const interestList = await interestApi.getByUserid(account.id)
            loadRef.current.classList.add("hidden")
            showRef.current.classList.remove("hidden")
            setInterest(interestList.data)
        })();
    }, [])

    // useEffect(() => {
    //     (async () => {
    //         const data = await serviceApi.getAll()
    //         setServiceList(data.data);
    //     })();
    // }, [])

    // useEffect(() => {
    //     (async () => {
    //         const data = await imageApi.getAll()
    //         setImageList(data.data);
    //     })();

    // }, [])

    async function pushServiceInterest(id) {
        interestApi.pushListService(data, id)
    }

    function handleCreateInterest() {
        value.handleSetBigBox('Đặt tên cho danh sách mong muốn này', 'createInterest')
    }

    // function findImageList(id) {
    //     return imageList.filter((item) => {
    //         return item.placeid === id
    //     })
    // }

    function handleAddInterestPlace(id) {
        serviceInterest.heartRef.farthestViewportElement.style.fill = 'var(--color_heart)'
        interestApi.addInterestPlace({
            "placeModel": {
                "placeid": Number(serviceInterest.id)
            },
            "wishListsModel": {
                "wishlistid": Number(id)
            }
        })
        value.handleDisplayBigBox()
    }

    return (<div className="py-[30px] px-[15px] min-h-[190px]">
        <div ref={showRef} className="hidden">
            <div onClick={handleCreateInterest} className='flex items-center cursor-pointer mb-4'>
                <button className='p-5 rounded-lg border border-solid border-normal mr-4'>
                    <AiOutlinePlus className='text-3xl' />
                </button>
                <div className='font-medium'>Tạo danh sách mong muốn mới</div>
            </div>
            <div>
                {interest && interest.map((item1) => {
                    return (
                        <div onClick={() => {handleAddInterestPlace(item1.wishlistid)}} key={item1.wishlistid} className={`${cx('interest_item')} flex items-center mt-2 py-3 px-3 mx-[-12px] rounded-lg cursor-pointer`}>
                            <div className='w-[72px] h-[72px] overflow-hidden rounded-lg mr-4 '>
                                <img className='w-full h-full' src={item1.image ? item1.image : "https://a0.muscache.com/im/pictures/1366a633-171a-4592-9a51-cd4e6f46a897.jpg"} alt="" />
                            </div>
                            <div>
                                <div className='font-medium'>{item1.wishlistname}</div>
                            </div>
                        </div>
                    )
                }
                )}
            </div>
        </div>
        <div ref={loadRef}>
            <Loader />
        </div>
    </div>);
}

export default Interests;