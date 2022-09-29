import Header from '../../../components/common/Header'
import Footer from '../../../components/common/Footer';
import interestApi from '../../../api/interestApi';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import serviceApi from '../../../api/serviceApi';
import imageApi from '../../../api/imageApi';

import style from './wishlist.module.scss'
import classNames from 'classnames/bind';
const cx = classNames.bind(style)

function WishList() {
    const navigate = useNavigate()
    const [interestList, setInterestList] = useState()
    const [serviceList, setServiceList] = useState()
    const [imageList, setImageList] = useState()
    const account = JSON.parse(localStorage.getItem('account'))
    const checkNameInterest = []

    useEffect(() => {
        (async ()=> {
            const data = await interestApi.getAll()
            setInterestList(data.data)
        })()
    }, [])

    useEffect(() => {
        (async ()=> {
            const data = await serviceApi.getAll()
            setServiceList(data.data)
        })()
    }, [])

    useEffect(() => {
        (async ()=> {
            const data = await imageApi.getAll()
            setImageList(data.data)
        })()
    }, [])

    function findImageList(id) {
        return imageList ? imageList.filter((item) => {
            return item.placeid === id
        }) : []
    }

    function handleNavigateDetailWishList(id) {
        navigate(`/detailwishlist/${id}`)
    }

    return ( <div>
        <Header/>
        <div className='wrap my-24 '>
            <div className='text-3xl font-bold text-[#222222] mb-11 pt-7'>Yêu thích</div>
            <div className='grid grid-cols-3 mx-[-16px]'>
                {interestList && interestList.map((item) => {
                    return serviceList && serviceList.map((item2) => {
                        if(item.placeid === item2.id && account.id === item.userid && checkNameInterest.includes(item.name) === false) {
                            checkNameInterest.push(item.name)
                            return (
                                <div key={item.id} onClick={() => handleNavigateDetailWishList(item.id)} className={`${cx('wishlist')} px-4 py-3 rounded-lg cursor-pointer`}>
                                    {findImageList(item.placeid) && findImageList(item.placeid).length !== 0 ? 
                                        <div className='flex h-[216px] rounded-3xl overflow-hidden'>
                                            <div className='w-[67%] h-full mr-[2px]'>
                                                <img className='h-full w-full' src={findImageList(item.placeid).length && findImageList(item.placeid)[0].name} alt="" />
                                            </div>
                                            <div className='w-[33%] h-full'>
                                                <div className='h-[50%] mb-[2px]'>
                                                    <img className='h-full w-full' src={findImageList(item.placeid).length && findImageList(item.placeid)[1].name} alt="" />
                                                </div>
                                                <div className='h-[50%]'>
                                                    <img className='h-full w-full' src={findImageList(item.placeid).length && findImageList(item.placeid)[2].name} alt="" />
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
                        }
                        
                    })
                })}
            </div>
        </div>
        <Footer/>
    </div> );
}

export default WishList;