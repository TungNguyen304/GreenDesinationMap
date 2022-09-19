
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { useValueContext } from '../../hook';
import { setHomePage } from "../../store/actions/homePage";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import MapService from "../../components/Home/MapService";
import Navbar from "../../components/Home/Navbar";
import Service from "../../components/Home/Service";
import BigBox from "../../components/Home/BigBox";
import ButtonMap from "../../components/common/ButtonMap";
import { useState } from "react";
import greenLocationApi from "../../api/greenLocationApi"
import style from './home.module.scss'
import classNames from 'classnames/bind';
import { useEffect } from "react";
const cx = classNames.bind(style)


function Home({type, title}) {
    const value = useValueContext()
    const {handleDisplayBigBox, handleSetBigBox} = value
    const show = useSelector(state => state.bigboxReducer.show)
    const typeService = useSelector(state => state.serviceReducer.serviceType)
    const dispatch = useDispatch()
    
    const homePage = useSelector(state => state.homePageReducer.type)


    const [selectPosition, setSelectPosition] = useState(null);
    const [positionList, setPositionList] = useState()

    useEffect(() => {
        (async() => {
            const data = await greenLocationApi.getAll()
            setPositionList(data.data)
          })()
    }, [])
    function handleSetSubPage() {
        if(homePage === 'map')
            dispatch(setHomePage('list'))
        else
            dispatch(setHomePage('map'))
    }
    
    
    return ( <div>
        <div>
            <Header selectPosition={selectPosition} setSelectPosition={setSelectPosition} positionList={positionList}/>
            <div className={`${cx('header_virtual')}`}></div>
            <Navbar handleDisplayBigBox={handleDisplayBigBox} handleSetBigBox={handleSetBigBox}/>
            {show && <div>
                <BigBox title={title} type={type} handleDisplayBigBox={handleDisplayBigBox}/>
            </div>}
            {homePage === "map" ? <MapService selectPosition={selectPosition} setSelectPosition={setSelectPosition} positionList={positionList} typeService={typeService}/> : <Service typeService={typeService}/>}
            <div className="h-10">
            </div>
            <ButtonMap handleSetSubPage={handleSetSubPage} content={homePage === "map" ? "Hiện danh sách" : "Hiện bản đồ"} type={homePage}/>
            <Footer/>
        </div>
    </div> );
}

export default Home