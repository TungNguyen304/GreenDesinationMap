import Header from "../../../components/common/Header";
import Footer from "../../../components/common/Footer";
import { useValueContext } from "../../../hook";
import { useSelector } from "react-redux";
import BigBox from "../../../components/Home/BigBox";

import style from './host.module.scss'
import classNames from 'classnames/bind';
const cx = classNames.bind(style)

function Host({title, type}) {
    const value = useValueContext()
    const {handleDisplayBigBox} = value
    const show = useSelector(state => state.bigboxReducer.show)

    return ( <div>
        <Header/>
        <div className={`${cx('body')}`}>
            <div className={`${cx('nottification')}`}>
                <div className="wrap py-[64px] px-[32px]">
                    <div className="text-3xl font-semibold text-white">
                        Hôm nay
                    </div>
                    <div className="flex overflow-x-visible mt-6 min-h-[122px]">

                    </div>
                </div>
            </div>
        </div>
        {show && <div>
                <BigBox title={title} type={type} handleDisplayBigBox={handleDisplayBigBox}/>
            </div>}
        <Footer/>
    </div> );
}

export default Host;