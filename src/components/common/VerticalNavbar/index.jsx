import { useRef } from "react";

function VerticalNarbar({title, listNavItem, cx, style, setTypeMail}) {
    const type = ["all", "yes", "no"]
    const wrapRef = useRef()
    function handleActive(event, index) {
        const list = [...wrapRef.current.getElementsByTagName('li')]
        list.forEach((item) => {
            item.classList.remove(style.active)
        })
        list[index].classList.add(style.active);
        setTypeMail(type[index])
    }

    return ( <div>
        <div className="text-2xl font-semibold px-4 pt-[7px]">
            {title}
        </div>
        <div>
            <ul ref={wrapRef} className="mt-5">
                {listNavItem && listNavItem.map((item, index) => {
                    return <li className={`${index === 0 ? cx('active') : ''} rounded-lg italic`} onClick={(e) => {handleActive(e, index)}} key={index}>
                        <div className="flex items-center rounded-lg hover:bg-[#c3c0c0] px-4 pt-[6px] pb-2 mt-2 cursor-pointer">
                            <item.component className={`text-xl mr-3 shrink-0 ${index === 1 ? 'text-green-600' : index === 2 ? 'text-red-600' : ''}`}/>
                            <span>{item.name}</span>
                        </div>
                    </li>
                })}
            </ul>
        </div>
    </div> );
}

export default VerticalNarbar;