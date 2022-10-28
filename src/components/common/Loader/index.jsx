import style from './loader.module.scss'
import classNames from 'classnames/bind';
const cx = classNames.bind(style)
function Loader() {
    return <div className={`${cx('loader')} w-full h-full`}></div>
}

export default Loader;