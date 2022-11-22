import LoaderImage from "../LoaderImage";
function BigLoader() {
    return ( <div className="w-[100vw] h-[100vh] fixed top-0 left-0 bg-[#000000e6] z-[1000] cursor-wait">
        <LoaderImage/>
    </div> );
}

export default BigLoader;