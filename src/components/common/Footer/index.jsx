import {BsCurrencyDollar, BsFillArrowUpCircleFill} from 'react-icons/bs'
import {AiFillSetting} from 'react-icons/ai'
import Scroll from 'react-scroll'
import style from './footer.module.scss'
import classNames from 'classnames/bind';
const cx = classNames.bind(style)

function Footer() {
    function slideTo() {
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop({
            duration: 1000,
            smooth: true
        });
    }

    return ( <div className={`${cx('footer')} hidden slg1250:block z-10`}>
        <div className={`${window.location.pathname === '/room' ? 'small_wrap' : 'wrap'}`}>
            <div className={`${cx('wrap_footer')}`}>
                <div>
                    <span>© 2022 Airbnb, Inc</span>
                    <span className='px-2'>.</span>
                    <a href="#">Quyền riêng tư</a>
                    <span className='px-2'>.</span>
                    <a href="#">Điều khoản</a>
                    <span className='px-2'>.</span>
                    <a href="#">Sơ đồ trang web</a>
                </div>
                <div className='flex items-center'>
                    <button className='flex items-center ml-4'>
                        <AiFillSetting className='mr-3'/>
                        <span className='font-semibold'>Tiếng Việt (VN)</span>
                    </button>
                    <button className='flex items-center ml-4'>
                        <BsCurrencyDollar className='mr-3'/>
                        <span className='font-semibold'>USD</span>
                    </button>
                    <button className='flex items-center ml-4'>
                        <span className='font-semibold'>Hỗ trợ tài nguyên</span>
                        <span className='ml-3 rounded-full p-2 active:scale-[0.9] hover:bg-[rgba(0,0,0,0.1)]' onClick={slideTo}><BsFillArrowUpCircleFill/></span>
                    </button>
                </div>
            </div>
        </div>
    </div> );
}

export default Footer;