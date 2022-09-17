
import style from './map.module.scss'
import classNames from 'classnames/bind';
const cx = classNames.bind(style)


function Map() {
    return ( <div className={`${cx('map')}`}>
        <div className="wrap">
            Map
        </div>
    </div> );
}

export default Map;