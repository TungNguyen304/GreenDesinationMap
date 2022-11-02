import Header from '../../../components/common/Header'
import Footer from '../../../components/common/Footer';
import interestApi from '../../../api/interestApi';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React, { useState, useEffect, Suspense } from 'react';
import serviceApi from '../../../api/serviceApi';
import imageApi from '../../../api/imageApi';
import Loader from '../../../components/common/Loader';
// import WishListItem from '../../../components/common/WishListItem';



function WishList() {

    const WishListItem = React.lazy(async () => {
        return new Promise(resolve => setTimeout(resolve, 2000))
            .then(
                () => import('../../../components/common/WishListItem')
            )
            .catch((error) => {
                console.log(error);
            })
    });

    const navigate = useNavigate()
    const [interestList, setInterestList] = useState()
    const [serviceList, setServiceList] = useState()
    const [imageList, setImageList] = useState()
    const account = useSelector(state => state.accountReducer).user
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
        <div className='wrap my-24 w-[90%]'>
            <div className='text-3xl font-bold text-[#222222] mb-11 pt-7'>Yêu thích</div>
            <Suspense fallback={<Loader/>}>
                <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mx-[-16px]'>
                    {interestList && interestList.map((item) => {
                        return serviceList && serviceList.map((item2) => {
                            if(item.placeid === item2.id && account.id === item.userid && checkNameInterest.includes(item.name) === false) {
                                checkNameInterest.push(item.name)
                                return (
                                    <WishListItem key={item.id} item={item} handleNavigateDetailWishList={handleNavigateDetailWishList} findImageList={findImageList}/>
                                )
                            }
                            
                        })
                    })}
                </div>
            </Suspense>
        </div>
        <Footer/>
    </div> );
}

export default WishList;