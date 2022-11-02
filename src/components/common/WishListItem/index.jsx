import style from './wishlistitem.module.scss'
import classNames from 'classnames/bind';
const cx = classNames.bind(style)

function WishListItem({item, handleNavigateDetailWishList, findImageList}) {
    return ( <div onClick={() => handleNavigateDetailWishList(item.id)} className={`${cx('wishlist')} px-4 py-3 rounded-lg cursor-pointer`}>
    {findImageList(item.placeid) && findImageList(item.placeid).length !== 0 ? 
        <div className='flex h-[216px] rounded-3xl overflow-hidden'>
            <div className='w-[67%] h-full mr-[2px]'>
                <img className='h-full w-full object-cover' src={findImageList(item.placeid).length && findImageList(item.placeid)[0].name} alt="" />
            </div>
            <div className='w-[33%] h-full'>
                <div className='h-[50%] mb-[2px]'>
                    <img className='h-full w-full object-cover' src={findImageList(item.placeid).length && findImageList(item.placeid)[1].name} alt="" />
                </div>
                <div className='h-[50%]'>
                    <img className='h-full w-full object-cover' src={findImageList(item.placeid).length && findImageList(item.placeid)[2].name} alt="" />
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
</div> );
}

export default WishListItem;