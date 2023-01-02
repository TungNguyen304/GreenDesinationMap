import LoaderImage from "../LoaderImage";
function BigLoader() {
    const isRoom = window.location.pathname.includes("/room")
    return ( <div className={`w-[100vw] h-[100vh] fixed top-0 left-0 z-[1000] cursor-wait ${isRoom ? 'bg-white' : 'bg-[#000000e6]'}`}>
        <LoaderImage/>
    </div> );
}

export default BigLoader;