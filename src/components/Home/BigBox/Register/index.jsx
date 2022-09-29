import {HiOutlineUser} from 'react-icons/hi'
import {MdLockOutline} from 'react-icons/md'
import {AiOutlineArrowRight, AiOutlineMail, AiOutlinePhone} from 'react-icons/ai'

function Register() {
    return ( <div>
        <div className='px-5'>
            <div className='flex justify-between mb-5'>
                <div className='border-b-2 border-solid border-gray-600'>
                    <input className='w-[80%] py-2 placeholder:text-gray-600' type="text" placeholder="First Name"/>
                </div>
                <div className='border-b-2 border-solid border-gray-600'>
                    <input className='w-[80%] py-2 placeholder:text-gray-600' type="text" placeholder="Last Name"/>
                </div>
            </div>
            <div className='w-full flex items-center border-b-2 border-solid border-gray-600 mb-5'>
                <input className='w-full py-2 placeholder:text-gray-600' type="text"  name="" id="" placeholder="Username"/>
                <HiOutlineUser/>
            </div>
            <div className='w-full flex items-center border-b-2 border-solid border-gray-600 mb-5'>
                <input className='w-full py-2 placeholder:text-gray-600' type="text" placeholder='Email Address'/>
                <AiOutlineMail/>
            </div>

            <div className='w-full flex items-center border-b-2 border-solid border-gray-600 mb-5'>
                <input className='w-full py-2 placeholder:text-gray-600' type="text" placeholder='Phone Number'/>
                <AiOutlinePhone/>
            </div>

            <div className='w-full flex items-center border-b-2 border-solid border-gray-600 mb-5'>
                <input className='py-2 w-full placeholder:text-gray-600' type="text" name="city"  list="gender" placeholder='Gender'/>
                <datalist id='gender'>
                    <option value="Male"/>
                    <option value="FeMale"/>
                    <option value="Other"/>
                </datalist>
            </div>
            <div className='w-full flex items-center border-b-2 border-solid border-gray-600 mb-5'>
                <input className='w-full py-2 placeholder:text-gray-600' type="text" placeholder='Password'/>
                <MdLockOutline/>
            </div>
            <div className='w-full flex items-center border-b-2 border-solid border-gray-600 mb-8'>
                <input className='w-full py-2 placeholder:text-gray-600' type="text" placeholder='Confirm Password'/>
                <MdLockOutline/>
            </div>

            <button style={{"backgroundImage": "linear-gradient(to right, #07D5DF, #7F6DEF, #F408FE)"}} className='mb-5 bg-[#333] text-white py-3 px-10 flex items-center mx-auto rounded-full hover:opacity-90 active:scale-[0.98]'>
                <span className='font-semibold italic'>REGISTER</span>
                <AiOutlineArrowRight className='text-white ml-2'/>
            </button>
        </div>
    </div> );
}

export default Register;