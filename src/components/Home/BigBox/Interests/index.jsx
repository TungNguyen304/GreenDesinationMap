import { useEffect } from 'react';
import {AiOutlinePlus} from 'react-icons/ai'
import { useValueContext } from '../../../../hook';
import interestApi from '../../../../api/interestApi';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import style from './interest.module.scss'
import classNames from 'classnames/bind';
const cx = classNames.bind(style)

function Interests() {
    const data = useSelector(state => state.serviceReducer.service)
    const value = useValueContext()
    const [interest, setInterest] = useState()
    const [service, setService] = useState()
    useEffect(() => {
        (async () => {
            const interestList = await interestApi.getAll()
            setInterest(interestList.data);
        })();

    }, [])

    async function pushServiceInterest(id) {
        interestApi.pushListService(data, id)
    }

    function handleCreateInterest() {
        value.handleSetBigBox('Đặt tên cho danh sách mong muốn này', 'createInterest')
    }

    return ( <div className="py-[30px] px-[15px]">
        <div>
            <div onClick={handleCreateInterest} className='flex items-center cursor-pointer mb-4'>
                <button className='p-5 rounded-lg border border-solid border-normal mr-4'>
                    <AiOutlinePlus className='text-3xl'/>
                </button>
                <div className='font-medium'>Tạo danh sách mong muốn mới</div>
            </div>
            <div>
                {interest && interest.map((item, index) => {
                    return (
                        <div key={index} onClick={() => pushServiceInterest(item.id)} className={`${cx('interest_item')} flex items-center mt-2 py-3 px-3 mx-[-12px] rounded-lg cursor-pointer`}>
                            <div className='w-[72px] h-[72px] overflow-hidden rounded-lg mr-4 '>
                                <img className='w-full h-full' src={ item.list.length!=0 ? item.list[0].images[0]: "https://a0.muscache.com/im/pictures/1366a633-171a-4592-9a51-cd4e6f46a897.jpg" } alt="" />
                            </div>
                            <div>
                                <div className='font-medium'>{item.name}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    </div> );
}

export default Interests;