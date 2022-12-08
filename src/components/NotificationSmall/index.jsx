import { AiOutlineInfoCircle } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';

function NotificationSmall({ mail }) {
    const navigate = useNavigate()
    return (<div onClick={() => {navigate("/host/mailbox")}} className={`flex items-center justify-between px-5 text-[#504e4e] cursor-pointer rounded-xl border border-solid border-normal py-2 ${mail.state ? 'bg-white' : 'bg-slate-200'}`}>
        <div>
            <div><span className='font-bold text-lg'>Green Destination Team</span> <span className='text-sm'>đã phản hồi đến bạn</span></div>
            <div className="text-sm mb-1 underline italic">
                {mail.topic}
            </div>
        </div>
        <div>
            <AiOutlineInfoCircle className='text-green-600 text-3xl'/>
        </div>
    </div>
    );
}

export default NotificationSmall;