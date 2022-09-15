import location from '../../../../json/location.json'
import style from './filter.module.scss'
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { useState } from 'react';
const cx = classNames.bind(style)

function Filter() {
    const [arrDistrictCheck, setArrDistrictCheck] = useState()
    const services = useSelector(state => state.serviceReducer.serviceComponent)

    function handleCheckbox() {
        const districtsCheck = [...document.querySelectorAll(`.${style.location} input:checked`)]
        const data = districtsCheck.map((item) => {
            return item.value
        })
        setArrDistrictCheck(data)
    }

    return ( <div className={`${cx('filter')} relative h-full`}>
        <div>
            <div className='text-2xl mb-3 font-semibold'>Địa chỉ</div>
            <div>
                <div className='text-lg font-semibold mb-4'>Chọn Quận/Huyện: </div>
                <div className={`${cx('location')} grid grid-cols-4`}>
                    {location.districts.map((item, index) => {
                        return (
                            <div key={index} className='my-2 flex items-center'>
                                <input className='mr-2 w-5 h-5' onChange={handleCheckbox} value={item.name} type="checkbox" name="" id={item.code} />
                                <label htmlFor={item.code}>{item.name}</label>
                            </div>
                        )
                    })}
                </div>
            </div>
            {arrDistrictCheck && arrDistrictCheck.length > 0 && 
            <div>
                <div className='text-lg font-semibold mb-4 mt-3'>Chọn Xã/Phường: </div>
                <div>
                    {location.districts.map((item, index) => {
                        if(arrDistrictCheck.includes(item.name)) {
                            return <>
                                <div className='underline mb-2'>{item.name}</div>
                                <div key={index} className='grid grid-cols-3 border border-solid border-normal pl-5 py-2 mb-4'>
                                    {item.wards.map((item, index) => {
                                        return (
                                            <div key={index} className='my-2 flex items-center'>
                                                <input className='mr-2 w-5 h-5' type="checkbox" value={item.name} name="" id={item.code} />
                                                <label htmlFor={item.code}>{item.name}</label>
                                            </div>
                                        )
                                    })}
                                </div>
                            </>
                        }
                    })}
                </div>
            </div>
            }
        </div>

        <div>
        <div className='text-2xl mb-3 mt-5 font-semibold'>Dịch vụ</div>
            <div>
                <div className='text-lg font-semibold mb-4'>Chọn loại dịch vụ: </div>
                <div className={`grid grid-cols-4`}>
                    {services.map((item, index) => {
                        return (
                            <div key={index} className='my-2 flex items-center'>
                                <input className='mr-2 w-5 h-5' value={item.name} type="checkbox" name="" id={item.type} />
                                <label htmlFor={item.type}>{item.name}</label>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>

        <div className='flex justify-end pb-5 mt-3'>
            <button className='py-2 px-5 rounded-xl bg-[#222] hover:bg-black cursor-pointer text-white'>Lưu</button>
        </div>
    </div> );
}

export default Filter;