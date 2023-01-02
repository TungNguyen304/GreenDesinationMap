import style from './wishlistitem.module.scss'
import classNames from 'classnames/bind';
const cx = classNames.bind(style)

function WishListItem({item, handleNavigateDetailWishList, image}) {
    return ( <div onClick={() => handleNavigateDetailWishList(item.wishlistid, item.wishlistname)} className={`${cx('wishlist')} px-4 py-3 rounded-2xl cursor-pointer`}>
        <div className='flex h-[216px] rounded-3xl overflow-hidden'>
            <div className='w-[100%] h-full mr-[2px]'>
                <img className='h-full w-full object-cover' src={image ? image : "https://a0.muscache.com/im/pictures/1366a633-171a-4592-9a51-cd4e6f46a897.jpg"} alt="" />
            </div>
        </div>
    <div className='text-xl font-semibold mt-3'>
        {item.wishlistname}
    </div>
</div> );
}

export default WishListItem;