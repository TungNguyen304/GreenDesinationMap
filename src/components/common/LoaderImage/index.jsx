import './loaderimage.scss'
function LoaderImage() {
    return (<div className='border border-dashed border-black w-full h-full'>
        <div className="loader">
            <div className="inner one"></div>
            <div className="inner two"></div>
            <div className="inner three"></div>
        </div>
    </div>);
}

export default LoaderImage;