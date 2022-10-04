import location from '../../../../json/location.json'
import style from './filter.module.scss'
import classNames from 'classnames/bind';
import { useValueContext } from '../../../../hook/index'
import { useDispatch } from 'react-redux';
import { setFilter } from '../../../../store/actions/filter';
import { useSelector } from 'react-redux';
import { Fragment, useState } from 'react';
import { useEffect } from 'react';
const cx = classNames.bind(style)

function Filter() {
    const dispatch = useDispatch()
    const value = useValueContext()
    const [arrDistrictCheck, setArrDistrictCheck] = useState()
    const services = useSelector(state => state.serviceReducer.serviceComponent)
    const { district, ward, serviceTypes } = useSelector(state => state.filterReducer.filter)

    function handleCheckbox() {
        const districtsCheck = [...document.querySelectorAll(`.${style.location} input:checked`)]
        const data = districtsCheck.map((item) => {
            return item.value
        })
        setArrDistrictCheck(data)
    }

    function handleSaveFilter() {
        const addressListElement = [...document.querySelectorAll(`.${style.location} div input:checked`)]
        const addressListValue = addressListElement.map((item) => {
            return item.value
        })
        const typeListElement = [...document.querySelectorAll(`.${style.type} div input:checked`)]
        const typeListValue = typeListElement.map((item) => {
            return item.value
        })

        const wardListElement = [...document.querySelectorAll(`.${style.ward} div input:checked`)]
        const wardListValue = wardListElement.map((item) => {
            return item.value
        })

        dispatch(setFilter({
            district: [...addressListValue],
            ward: [...wardListValue],
            type: [...typeListValue]
        }))

        value.handleSetBigBox('Bộ lọc', 'filter')
        value.handleDisplayBigBox()
    }

    useEffect(() => {
        handleCheckbox()
    }, [])

    return (<div className={`${cx('filter')} relative h-full`}>
        <div>
            <div className='text-2xl mb-3 font-semibold'>Địa chỉ</div>
            <div>
                <div className='text-lg font-semibold mb-4'>Chọn Quận/Huyện: </div>
                <div className={`${cx('location')} grid grid-cols-4`}>
                    {location.districts.map((item, index) => {
                        return (
                            <div key={index} className='my-2 flex items-center'>
                                <input className='mr-2 w-5 h-5' onChange={handleCheckbox} value={item.name} defaultChecked={district && district.length && district.includes(item.name)} type="checkbox" name="" id={item.code} />
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
                            if (arrDistrictCheck.includes(item.name)) {
                                return <Fragment key={index}>
                                    <div className='underline mb-2'>{item.name}</div>
                                    <div key={index} className={`grid grid-cols-3 border border-solid border-normal pl-5 py-2 mb-4 ${cx('ward')}`}>
                                        {item.wards.map((item, index) => {
                                            return (
                                                <div key={index} className='my-2 flex items-center'>
                                                    <input className='mr-2 w-5 h-5' type="checkbox" value={item.name} defaultChecked={ward && ward.length && ward.includes(item.name)} name="" id={item.code} />
                                                    <label htmlFor={item.code}>{item.name}</label>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </Fragment>
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
                <div className={`grid grid-cols-4 ${cx('type')}`}>
                    {services.map((item, index) => {
                        return (
                            <div key={index} className='my-2 flex items-center'>
                                <input className='mr-2 w-5 h-5' value={item.type} defaultChecked={serviceTypes && serviceTypes.length && serviceTypes.includes(item.type)} type="checkbox" name="" id={item.type} />
                                <label htmlFor={item.type}>{item.name}</label>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>

        <div className='flex justify-end pb-5 mt-3'>
            <button style={{ "backgroundImage": "linear-gradient(to right, #07D5DF, #7F6DEF, #F408FE)" }} onClick={handleSaveFilter} className='py-2 px-8 rounded-xl hover:brightness-75 cursor-pointer text-white'>Lưu</button>
        </div>
    </div>);
}

export default Filter;