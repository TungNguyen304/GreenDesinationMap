function ButtonLogin({text, Icon, color, ...props}) {
    return ( <div onClick={props.onclick} className="flex cursor-pointer justify-center relative items-center w-full border border-solid border-black mb-5 rounded-lg py-3 hover:bg-[rgba(0,0,0,0.1)]">
        <div style={{'color': `${color}`}} className={`absolute text-xl left-5 translate-y-[-50%] top-[50%]`}>
            <Icon/>
        </div>
        <div>{text}</div>    
    </div> );
}

export default ButtonLogin;