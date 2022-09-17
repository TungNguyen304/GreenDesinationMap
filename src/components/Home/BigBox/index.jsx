import {IoCloseOutline} from 'react-icons/io5'
import Filter from './Filter'
import Register from '../../Home/BigBox/Register'
import Login from './Login'
import Interests from './Interests';
import CreateInterest from './CreateInterest';
import { useDispatch } from 'react-redux';
import { setshowhidden } from '../../../store/actions/bigbox';
import { useValueContext } from '../../../hook';

function BigBox({title, type, ...props}) {
    const value = useValueContext()
    const dispatch = useDispatch()
    function handleBack() {
        if(type === 'createInterest') {
            value.handleSetBigBox('Danh sách yêu thích của bạn', 'interests')
        }
        else {
            dispatch(setshowhidden(false))
            props.handleDisplayBigBox()
        }
    }
    return ( <div onClick={() => {dispatch(setshowhidden(false)); props.handleDisplayBigBox()}} className="w-full flex items-center justify-center fixed top-0 bottom-0 left-0 right-0 z-50 h-[100vh] bg-[rgba(0,0,0,0.4)]">
        <div onClick={(e) => e.stopPropagation()} className={`${type === 'filter' ? 'w-[50%]':'w-[30%]'} rounded-2xl bg-white`}>
            <div style={{'borderColor': 'var(--border)'}} className="h-[8vh] flex justify-center items-center text-xl font-semibold relative border-b border-solid">
                <div className='italic'>
                    {title}
                </div>
                <div onClick={handleBack} className='absolute top-[50%] left-5 translate-y-[-50%] p-1 rounded-full active:scale-[0.9] cursor-pointer select-none hover:bg-[rgba(0,0,0,0.1)]'>
                    <IoCloseOutline/>
                </div>
            </div>
            <div className={`${type === 'login'?'h-[78vh]':'h-auto max-h-[82vh]'} p-5 overflow-auto`}>
                {type === 'filter' ? <Filter/> : type === 'login' ? <Login/> : type ==='register' ? <Register/> : type === 'interests' ? <Interests/> : <CreateInterest/>}
            </div>
        </div>
    </div> );
}

export default BigBox;