import Header from '../../components/common/Header'
import Footer from '../../components/common/Footer';
import interestApi from '../../api/interestApi';
import { useState } from 'react';
import { useEffect } from 'react';

import style from './wishlist.module.scss'
import classNames from 'classnames/bind';
const cx = classNames.bind(style)

function WishList() {
    const [interests, setInterests] = useState()
    useEffect(() => {
        (async ()=> {
            const data = await interestApi.getAll()
            setInterests(data.data)
        })()
    }, [])
    console.log(interests);
    return ( <div>
        <Header/>
        <div className='wrap my-24 '>
            <div className='text-3xl font-bold text-[#222222] mb-11 pt-7'>Yêu thích</div>
            <div className='grid grid-cols-3 mx-[-16px]'>
                {interests && interests.map((item) => {
                    return (
                        <div key={item.id} className={`${cx('wishlist')} px-4 py-3 rounded-lg cursor-pointer`}>
                            {item.list.length !== 0 ? 
                                <div className='flex h-[216px] rounded-3xl overflow-hidden'>
                                    <div className='w-[67%] h-full mr-[2px]'>
                                        <img className='h-full w-full' src={item.list[0].images[0]} alt="" />
                                    </div>
                                    <div className='w-[33%] h-full'>
                                        <div className='h-[50%] mb-[2px]'>
                                            <img className='h-full w-full' src={item.list[0].images[1]} alt="" />
                                        </div>
                                        <div className='h-[50%]'>
                                            <img className='h-full w-full' src={item.list[0].images[2]} alt="" />
                                        </div>
                                    </div>
                                </div> : 
                                <div className='flex h-[216px] rounded-3xl overflow-hidden'>
                                    <div className='w-full h-full mr-[2px] bg-[#dddddd]'>
                                    </div>
                                </div>
                            }
                            <div className='text-xl font-semibold mt-3'>
                                {item.name}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
        <Footer/>
    </div> );
}

export default WishList;