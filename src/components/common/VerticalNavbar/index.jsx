import { useRef } from "react";

function VerticalNarbar({title, listNavItem}) {
    const wrapRef = useRef()
    function handleActive(event, index) {
        const list = [...wrapRef.current.getElementsByTagName('li')]
        list.forEach((item) => {
            item.style.backgroundColor = '#F7F7F7'
            item.style.color = '#717171'
        })

        list[index].style.backgroundColor = 'black';
        list[index].style.color = 'white'

    }

    return ( <div>
        <div className="text-2xl font-semibold px-4 pt-[7px]">
            {title}
        </div>
        <div>
            <ul ref={wrapRef} className="mt-5">
                {listNavItem && listNavItem.map((item, index) => {
                    return <li className="text-[#717171] rounded-full" onClick={(e) => {handleActive(e, index)}} key={index}>
                        <div className="flex items-center rounded-full hover:bg-[#EBEBEB] hover:text-[#717171] px-4 pt-[6px] pb-2 mt-1 cursor-pointer">
                            <item.component className="mt-1 text-xl mr-3"/>
                            <span>{item.name}</span>
                        </div>
                    </li>
                })}
            </ul>
        </div>
    </div> );
}

export default VerticalNarbar;