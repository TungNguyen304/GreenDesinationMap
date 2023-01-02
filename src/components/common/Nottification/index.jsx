import { useRef } from "react";
import notificationApi from "../../../api/notificationApi";

function Nottification({ mail, mails, index, setMails, subIndex }) {
    const contentRef = useRef()
    const notiRef = useRef()
    function handleUpdateState(event) {
        if (!mail.state) {
            notificationApi.update(mail.notificationid)
            mails[index].mailList[subIndex].state = true
            setMails([...mails])
            notiRef.current.classList.remove("bg-slate-200")
            notiRef.current.classList.add("bg-white")
        }
        contentRef.current.classList.toggle("hidden")
        contentRef.current.classList.toggle("inline-block")
    }

    return (<div ref={notiRef} onClick={(e) => { handleUpdateState(e) }} className={`flex items-center justify-between px-10 text-[#504e4e] cursor-pointer rounded-sm border-green-600 mb-3 py-2 border-l-[3px] border-solid ${mail.state ? 'bg-white' : 'bg-slate-200'}`}>
        <div className="flex items-center">
            <div className='w-[60px] h-[60px] shrink-0 bg-[#ccc] p-2 rounded-full mr-10'>
                <img src={require("../../../assets/images/admin.png")} alt="" />
            </div>
            <div>
                <div><span className='font-bold text-lg'>Green Destination Team</span> đã phản hồi đến bạn</div>
                <div className="text-sm mb-1">
                    {mail.topic}
                </div>
                <div ref={contentRef} className="border-2 hidden rounded-md border-solid border-[#a5a3a3] py-2 px-10 italic">
                    {mail.notificationcontent}
                </div>
            </div>
        </div>
        <div className="text-sm shrink-0 ml-3">{(new Date(mail.sentdate)).toLocaleTimeString()} {(new Date(mail.sentdate)).toLocaleDateString()}</div>
        {/* <div className='border border-solid border-normal flex-1 px-8 py-1 rounded-md min401max866:mr-3 max400:mb-2'>Địa điểm cafe highland của bạn đã duyệt thành công</div>
        <div className='border border-solid border-normal mx-3 px-3 py-1 rounded-md max866:hidden'>Ngày 10/4/2022 19:30</div>
        <div className='flex items-center border border-solid border-normal px-3 py-1 rounded-md cursor-pointer hover:bg-[#EBEBEB]'>
            <span>Chi tiết</span>
            <RiArrowDownSFill className='text-2xl'/>
        </div> */}
    </div>);
}

export default Nottification;