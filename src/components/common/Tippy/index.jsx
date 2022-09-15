import Bottom from "./Bottom";
import Top from "./Top";
import style from './tippy.module.scss'
import classNames from 'classnames/bind';
const cx = classNames.bind(style)

function Tippy({topList, bottomList1, bottomList2}) {
    return ( <div style={{'boxShadow': '2px 2px 6px 4px rgba(0,0,0,0.18)'}} className={`${cx('tippy')} absolute w-[240px] bg-white top-[130%] z-10 right-[-4px] rounded-lg`}>
        {topList && <Top list={topList}/>}
        {bottomList1 && <Bottom list={bottomList1}/>}
        {bottomList2 && bottomList2.length!==0 && <Bottom list={bottomList2}/>}
    </div> );
}

export default Tippy;