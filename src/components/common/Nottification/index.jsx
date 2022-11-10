import {RiArrowDownSFill} from 'react-icons/ri'

function Nottification() {
    return ( <div className='flex items-center justify-between mb-3 max400:flex-col'>
        <div className='border border-solid border-normal flex-1 px-8 py-1 rounded-md min401max866:mr-3 max400:mb-2'>Địa điểm cafe highland của bạn đã duyệt thành công</div>
        <div className='border border-solid border-normal mx-3 px-3 py-1 rounded-md max866:hidden'>Ngày 10/4/2022 19:30</div>
        <div className='flex items-center border border-solid border-normal px-3 py-1 rounded-md cursor-pointer hover:bg-[#EBEBEB]'>
            <span>Chi tiết</span>
            <RiArrowDownSFill className='text-2xl'/>
        </div>
    </div> );
}

export default Nottification;