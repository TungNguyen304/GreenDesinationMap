import style from './comment.module.scss'
import classNames from 'classnames/bind';
const cx = classNames.bind(style)

function Comment({name, date, content, image}) {
    return ( <div className="mb-7 mr-[95px]">
        <div>
            <div className="flex items-center">
                <div className="mr-3">
                    <img className="w-[40px] h-[40px] rounded-full" src={image} alt="" />
                </div>
                <div>
                    <div className="font-medium">{name}</div>
                    <div className="text-[#717171]">{date}</div>
                </div>
            </div>
        </div>
        <div className={`${cx('desc')} mt-4 text-[#444242] text-lg`}>
        {content}
        </div>
    </div> );
}

export default Comment;