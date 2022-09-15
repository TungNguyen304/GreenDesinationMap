import { createContext } from "react";
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { setshowdisplay } from "../../store/actions/bigbox";
import { setshowhidden } from "../../store/actions/bigbox";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import Navbar from "../../components/Home/Navbar";
import Service from "../../components/Home/Service";
import BigBox from "../../components/Home/BigBox";
import ButtonMap from "../../components/common/ButtonMap";
import { useState } from "react";
import style from './home.module.scss'
import classNames from 'classnames/bind';
const cx = classNames.bind(style)

export const bigBoxContext = createContext()

function Home() {
    const typeService = useSelector(state => state.serviceReducer.serviceType)
    const dispatch = useDispatch()
    const show = useSelector(state => state.bigboxReducer.show)
    const [title, setTitle] = useState('')
    const [type, setType] = useState('')
    function handleDisplayBigBox() {
        if(show) {
            dispatch(setshowhidden(false))
        }
        else
            dispatch(setshowdisplay(true))
    }
    function handleSetBigBox(title, type) {
        setTitle(title)
        setType(type)
    }

    const bigBoxEvent = {
        handleDisplayBigBox,
        handleSetBigBox
    }
    
    return ( <div>
        <bigBoxContext.Provider value={bigBoxEvent}>
            <Header/>
            <div className={`${cx('header_virtual')}`}></div>
            <Navbar handleDisplayBigBox={handleDisplayBigBox} handleSetBigBox={handleSetBigBox}/>
            {show && <div>
                <BigBox title={title} type={type} handleDisplayBigBox={handleDisplayBigBox}/>
            </div>}
            <Service typeService={typeService}/>
            <div className="h-10">
            </div>
            <ButtonMap/>
            <Footer/>
        </bigBoxContext.Provider>
    </div> );
}

export default Home