import Header from "../../../components/common/Header";
import Footer from "../../../components/common/Footer";
import Profile from "../../../components/Account/Profile";
import { useValueContext } from "../../../hook";
import BigBox from "../../../components/Home/BigBox";
import { useSelector } from "react-redux";

function Account({type, title}) {
    const value = useValueContext()
    const show = useSelector(state => state.bigboxReducer.show)
    return ( <div>
        <Header/>
        <Profile/>
        {show && <div>
                <BigBox title={title} type={type} handleDisplayBigBox={value.handleDisplayBigBox}/>
        </div>}
        <Footer/>
    </div> );
}

export default Account;