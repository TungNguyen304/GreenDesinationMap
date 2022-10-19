import style from './loader.module.scss'
import classNames from 'classnames/bind';
const cx = classNames.bind(style)
function Loader() {
    return <div className={`${cx('loader')}`}></div>
}

export default Loader;