import {BsFillMapFill} from 'react-icons/bs'

function ButtonMap() {
    return ( <div className='inline left-[50%] translate-x-[-50%] fixed bottom-[100px] justify-center '>
        <div className='inline-flex justify-center hover:bg-primary bg-[#222222] px-5 pt-[13px] pb-4 rounded-full items-center mx-auto hover:scale-[1.08] hover:text-white cursor-pointer text-primary fill-primary hover:fill-white'>
            <div className='mr-2 text-sm font-semibold'>Hiện bản đồ</div>
            <div><BsFillMapFill/></div>
        </div>
    </div> );
}

export default ButtonMap;