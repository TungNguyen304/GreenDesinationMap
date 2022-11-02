import {BsFillMapFill} from 'react-icons/bs'
import {GrUnorderedList} from 'react-icons/gr'
function ButtonMap({content, handleSetSubPage, type}) {
    function handleSubPageHome() {
        if(type === "map") {
            handleSetSubPage("service")
        }
        else {
            handleSetSubPage("map")
        }

    }
    return ( <div onClick={handleSubPageHome} className='inline ssm:fixed left-[50%] translate-x-[-50%] fixed bottom-[100px] justify-center'>
        <div className='inline-flex justify-center hover:bg-primary bg-[#222222] px-5 pt-[13px] pb-4 rounded-full items-center mx-auto hover:scale-[1.08] hover:text-white cursor-pointer text-primary fill-primary hover:fill-white'>
            {/* <div className='mr-2 text-sm font-semibold'></div> */}
            <div className='flex items-center italic'>  
                <div className='whitespace-nowrap'>{content}</div>
                {type === "map" ? <GrUnorderedList className='ml-2'/> : <BsFillMapFill className='ml-2'/>}
            </div>
        </div>
    </div> );
}

export default ButtonMap;