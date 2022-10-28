import { useEffect } from 'react';
import { AiOutlinePlus } from 'react-icons/ai'
import { useValueContext } from '../../../../hook';
import interestApi from '../../../../api/interestApi';
import serviceApi from '../../../../api/serviceApi';
import imageApi from '../../../../api/imageApi';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import style from './interest.module.scss'
import classNames from 'classnames/bind';
const cx = classNames.bind(style)

function Interests() {
    const data = useSelector(state => state.serviceReducer.service)
    const interestNames = []
    const value = useValueContext()
    const [interest, setInterest] = useState([])
    const [serviceList, setServiceList] = useState([])
    const [imageList, setImageList] = useState([])
    const account = useSelector(state => state.accountReducer).user

    useEffect(() => {
        (async () => {
            const interestList = await interestApi.getAll()
            setInterest(interestList.data);
        })();
    }, [])

    useEffect(() => {
        (async () => {
            const data = await serviceApi.getAll()
            setServiceList(data.data);
        })();

    }, [])

    useEffect(() => {
        (async () => {
            const data = await imageApi.getAll()
            setImageList(data.data);
        })();

    }, [])

    async function pushServiceInterest(id) {
        interestApi.pushListService(data, id)
    }

    function handleCreateInterest() {
        value.handleSetBigBox('Đặt tên cho danh sách mong muốn này', 'createInterest')
    }

    function findImageList(id) {
        return imageList.filter((item) => {
            return item.placeid === id
        })
    }

    return (<div className="py-[30px] px-[15px]">
        <div>
            <div onClick={handleCreateInterest} className='flex items-center cursor-pointer mb-4'>
                <button className='p-5 rounded-lg border border-solid border-normal mr-4'>
                    <AiOutlinePlus className='text-3xl' />
                </button>
                <div className='font-medium'>Tạo danh sách mong muốn mới</div>
            </div>
            <div>
                {interest && interest.map((item1) => {
                    return serviceList && serviceList.map((item2) => {
                        if(item1.placeid === item2.id && account.id === item1.userid && interestNames.includes(item1.name) === false) {
                            interestNames.push(item1.name)
                            return (
                                <div key={item1.id} className={`${cx('interest_item')} flex items-center mt-2 py-3 px-3 mx-[-12px] rounded-lg cursor-pointer`}>
                                    <div className='w-[72px] h-[72px] overflow-hidden rounded-lg mr-4 '>
                                        <img className='w-full h-full' src={findImageList(item1.placeid).length !== 0 ? findImageList(item1.placeid)[0].name : "https://a0.muscache.com/im/pictures/1366a633-171a-4592-9a51-cd4e6f46a897.jpg"} alt="" />
                                    </div>
                                    <div>
                                        <div className='font-medium'>{item1.name}</div>
                                    </div>
                                </div>
                            )
                        }
                    })
                })}
            </div>
        </div>
    </div>);
}

export default Interests;