import style from './navitem.module.scss'
import classNames from 'classnames/bind';
const cx = classNames.bind(style)

function NavItem({type, title, Component}) {
    return ( <div type={type} className={`${cx('nav_item')} flex justify-center text-center items-center flex-col`}>
        <Component className='text-2xl'/>
        <div className={`${cx('title')} font-semibold mt-1`}>{title}</div>
    </div> );
}

export default NavItem;