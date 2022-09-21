import style from './comment.module.scss'
import classNames from 'classnames/bind';
const cx = classNames.bind(style)

function Comment({name, date}) {
    return ( <div className="mb-7 mr-[95px]">
        <div>
            <div className="flex items-center">
                <div className="mr-3">
                    <img className="w-[40px] h-[40px] rounded-full" src="https://a0.muscache.com/im/pictures/user/1e823f06-2d27-4cff-a28e-5e8e936ddc75.jpg?im_w=240" alt="" />
                </div>
                <div>
                    <div className="font-medium">{name}</div>
                    <div className="text-[#717171]">{date}</div>
                </div>
            </div>
        </div>
        <div className={`${cx('desc')} mt-4 text-[#444242] text-lg`}>
        Thank you Bua and team for such a memorable stay. I already miss the space and atmosphere. Wishing you all more success and will always book a stay here during my visits. Thank you for everything!
        </div>
    </div> );
}

export default Comment;