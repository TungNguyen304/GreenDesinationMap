import './loaderimage.scss'
function LoaderImage() {
    const isProvidePhoto = window.location.pathname === "/host/registerservice/providephotos"
    return (<div className={`${isProvidePhoto ? 'border border-dashed border-black' : ''} w-full h-full`}>
        <div className="loader">
            <div className="inner one"></div>
            <div className="inner two"></div>
            <div className="inner three"></div>
        </div>
    </div>);
}

export default LoaderImage;