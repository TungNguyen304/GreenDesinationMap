import Header from '../../../components/common/Header'
import Footer from '../../../components/common/Footer';
import interestApi from '../../../api/interestApi';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useValueContext } from '../../../hook';
import React, { useState, useEffect, useRef } from 'react';
import Loader from '../../../components/common/Loader';
import WishListItem from '../../../components/common/WishListItem';



function WishList() {
    const navigate = useNavigate()
    const { loadRef } = useValueContext()
    const [interestList, setInterestList] = useState([])
    const loadRefSml = useRef()
    const account = useSelector(state => state.accountReducer.user)

    useEffect(() => {
        (async () => {
            if (account.id) {
                const data = await interestApi.getByUserid(account.id)
                loadRefSml.current.classList.add("hidden")
                setInterestList(data.data)
            }
        })()
    }, [account.id])

    function handleNavigateDetailWishList(id, wishlistname) {
        navigate(`/detailwishlist/${id}`)
        sessionStorage.setItem("interest", wishlistname)
        loadRef().classList.remove("hidden")
    }

    return (<div>
        <Header />
        <div className='wrap my-24 w-[90%]'>
            <div className='text-3xl font-bold text-[#222222] mb-11 pt-7'>Yêu thích</div>
            {interestList.length > 0 &&
                <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mx-[-16px]'>
                    {interestList.length > 0 && interestList.map((item) => {
                        return (
                            <WishListItem key={item.wishlistid} item={item} handleNavigateDetailWishList={handleNavigateDetailWishList} image={item.image} />
                        )
                    })}
                </div>}
            <div ref={loadRefSml} className=''>
                <Loader/>
            </div>
        </div>
        <Footer />
    </div>);
}

export default WishList;