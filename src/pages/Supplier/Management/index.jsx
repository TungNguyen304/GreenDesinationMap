import Header from "../../../components/common/Header";
import Footer from "../../../components/common/Footer";
import { useValueContext } from "../../../hook";
import { useSelector } from "react-redux";
import BigBox from "../../../components/Home/BigBox";

function Management({title, type}) {

    const value = useValueContext()
    const {handleDisplayBigBox} = value
    const show = useSelector(state => state.bigboxReducer.show)

    return ( <div>
        <Header/>

        {show && <div>
                <BigBox title={title} type={type} handleDisplayBigBox={handleDisplayBigBox}/>
            </div>}
        <Footer/>
    </div> );
}

export default Management;