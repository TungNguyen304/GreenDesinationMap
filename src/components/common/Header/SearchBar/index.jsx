import { BiSearch } from 'react-icons/bi'
import React, { useEffect, useState } from "react";
import List from "@material-ui/core/List";
import { useDispatch } from 'react-redux';
import { setServiceSearch } from '../../../../store/actions/search';
import { setServiceType } from '../../../../store/actions/service';
import serviceApi from '../../../../api/serviceApi';
import { useSelector } from 'react-redux';
import SearchElement from './SearchElement';
import { useRef } from 'react';

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";

function SearchBar({ hidden, ...props }) {
  const dispatch = useDispatch()
  const isRegiterServiceLocationPage = window.location.pathname.includes('/host/registerservice/location')
  const { district, ward, serviceTypes } = useSelector(state => state.filterReducer.filter)
  const { setSelectPosition, handleRegisterLocation } = props;
  const [positionList, setPositionList] = useState()
  const [typeSearch, setTypeSearch] = useState('full')
  const changeSearchTypeRef = useRef()
  const greenRef1 = useRef()
  const greenRef2 = useRef()
  const greenRef3 = useRef()
  let d = 0
  const [searchText, setSearchText] = useState("");
  const [listPlace, setListPlace] = useState([]);
  const recomment = useRef()

  useEffect(() => {
    (async () => {
      const data = await serviceApi.getAll()
      setPositionList(data.data)
    })()
  }, [])

  
  function removeClass() {
    recomment.current && recomment.current.classList.add('hidden')
    window.removeEventListener('click', removeClass)
  }

  function handleDisplayTippy(even) {
    const newArr = [...recomment.current.classList]
    if (newArr.includes('hidden')) {
      recomment.current && recomment.current.classList.remove('hidden')
      even.stopPropagation();
      window.addEventListener('click', removeClass)
    }
  }

  function handleChangeSearchType() {
    if (changeSearchTypeRef.current.style.left === '0px') {
      changeSearchTypeRef.current.style.left = '50%'
      changeSearchTypeRef.current.classList.remove('bg-green-600')
      changeSearchTypeRef.current.classList.add('bg-[#989999]')
      greenRef3.current.classList.remove('bg-[#989999]')
      greenRef3.current.classList.add('bg-green-600')
      greenRef1.current.style.opacity = 1
      greenRef2.current.style.opacity = 0
      setTypeSearch('green')
    } else {
      changeSearchTypeRef.current.style.left = '0px'
      greenRef1.current.style.opacity = 0
      greenRef2.current.style.opacity = 1
      changeSearchTypeRef.current.classList.add('bg-green-600')
      changeSearchTypeRef.current.classList.remove('bg-[#989999]')
      greenRef3.current.classList.add('bg-[#989999]')
      greenRef3.current.classList.remove('bg-green-600')
      setTypeSearch('full')
    }
  }

  function handleUpdateAddress(address) {
    let newAddress = address.toLowerCase()
    if ((newAddress.includes('đà nẵng') === false && newAddress.includes('da nang') === false) && (newAddress.includes('việt nam') === false && newAddress.includes('viet nam') === false)) {
      return newAddress + ', đà nẵng, việt nam'
    }
    else if ((newAddress.includes('đà nẵng') || newAddress.includes('da nang')) && (newAddress.includes('việt nam') === false && newAddress.includes('viet nam') === false)) {
      return newAddress + ', việt nam'
    }
    else if ((newAddress.includes('đà nẵng') === false && newAddress.includes('da nang') === false) && (newAddress.includes('việt nam') || newAddress.includes('viet nam'))) {
      return newAddress + ', đà nẵng'
    }
    return newAddress
  }

  return (<div className={`${hidden || "flex"}`} style={{ position: "relative", flexDirection: "column" }}>
    <div className='flex items-center'>
      <div className={`${window.location.pathname.includes('/host') ? 'hidden' : ''} mr-5 text-xs text-center cursor-pointer italic rounded-full relative select-none`}>
        <div ref={greenRef3} onClick={handleChangeSearchType} className='flex bg-[#989999] text-white font-medium rounded-full hover:opacity-90'>
          <div ref={greenRef1} style={{ transition: "all 0.5s ease-in-out", opacity: 0 }} className={`py-3 pl-3 pr-[6px] `}>
            Địa điểm xanh
          </div>
          <div ref={greenRef2} style={{ transition: "all 0.5s ease-in-out", opacity: 1 }} className='py-3 pr-3 pl-[6px] '>
            Địa điểm xanh
          </div>
        </div>
        <div style={{ transition: "all 0.3s ease-in", left: 0 }} ref={changeSearchTypeRef} className='py-1 px-3 font-medium w-[50%] h-[115%] bg-green-600 rounded-full flex items-center text-white absolute top-[-10%] left-0'>
          Toàn bản đồ
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", borderRadius: "50px", padding: "8px 10px 8px 20px", height: "100%", border: "1px solid var(--border)" }} className={`bg-white hover:shadow-normal rounded-full ${isRegiterServiceLocationPage ? 'w-full' : ''}`}>
        <div className='w-[400px]'>
          <input
            className='placeholder:italic'
            placeholder={typeSearch === 'full' ? 'Tìm kiếm ở đây ...(TP Đà Nẵng, Việt Nam)' : 'Tìm kiếm ở đây ...(Tìm theo tên, ít nhất 3 ký tự)'}
            style={{ width: "100%", height: "100%" }}
            value={searchText}
            onChange={(event) => {
              setSearchText(event.target.value);
            }}
          />
        </div>
        <div
          style={{ display: "flex", alignItems: "center", borderRadius: "100%", overflow: "hidden", width: "38px" }}
        >
          <button
            variant="contained"
            style={{ backgroundColor: "var(--primary)", padding: '6px' }}
            className='h-full rounded-full w-full flex justify-center items-center hover:opacity-90 active:scale-[0.9]'
            onClick={(e) => {
              // Search
              if (typeSearch === 'full') {
                searchText && handleDisplayTippy(e)
                const params = {
                  q: handleUpdateAddress(searchText),
                  format: "json",
                  addressdetails: 1,
                  polygon_geojson: 0,
                };
                const queryString = new URLSearchParams(params).toString();
                console.log(queryString);
                const requestOptions = {
                  method: "GET",
                  redirect: "follow",
                };
                fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)                                            
                  .then((response) => response.text())
                  .then((result) => {
                    console.log(JSON.parse(result));
                    setListPlace(JSON.parse(result));
                  })
                  .catch((err) => console.log("err: ", err));
              }
              else {
                const searchList = positionList.filter((item) => {
                  if (district.length && ward.length && serviceTypes.length) {
                    if(searchText === '') {
                      return district.includes('Quận ' + item.district) && ward.includes('Phường ' + item.ward) && serviceTypes.includes(item.type)
                    }
                    else {
                      return searchText.length >=3 && item.name.toLowerCase().includes(searchText.toLowerCase()) && district.includes('Quận ' + item.district) && ward.includes('Phường ' + item.ward) && serviceTypes.includes(item.type)
                    }
                  } else if (district.length && ward.length && !serviceTypes.length) {
                    if(searchText === '') {
                      return district.includes('Quận ' + item.district) && ward.includes('Phường ' + item.ward)
                    }
                    else {
                      return searchText.length >=3 && item.name.toLowerCase().includes(searchText.toLowerCase()) && district.includes('Quận ' + item.district) && ward.includes('Phường ' + item.ward)
                    }
                  } else if (district.length && !ward.length && serviceTypes.length) {
                    if(searchText === '') {
                      return district.includes('Quận ' + item.district) && serviceTypes.includes(item.type)
                    }
                    else {
                      return searchText.length >=3 && item.name.toLowerCase().includes(searchText.toLowerCase()) && district.includes('Quận ' + item.district) && serviceTypes.includes(item.type)
                    }
                  } else if (!district.length && ward.length && serviceTypes.length) {
                    if(searchText === '') {
                      return ward.includes('Phường ' + item.ward) && serviceTypes.includes(item.type)
                    }
                    else {
                      return searchText.length >=3 && item.name.toLowerCase().includes(searchText.toLowerCase()) && ward.includes('Phường ' + item.ward) && serviceTypes.includes(item.type)
                    }
                  } else if (district.length && !ward.length && !serviceTypes.length) {
                    if(searchText === '') {
                      return district.includes('Quận ' + item.district)
                    }
                    else {
                      return searchText.length >=3 && item.name.toLowerCase().includes(searchText.toLowerCase()) && district.includes('Quận ' + item.district)
                    }
                  } else if (!district.length && ward.length && !serviceTypes.length) {
                    if(searchText === '') {
                      return ward.includes('Phường ' + item.ward)
                    }
                    else {
                      return searchText.length >=3 && item.name.toLowerCase().includes(searchText.toLowerCase()) && ward.includes('Phường ' + item.ward)
                    }
                  } else if (!district.length && !ward.length && serviceTypes.length) {
                    if(searchText === '') {
                      return serviceTypes.includes(item.type)
                    }
                    else {
                      return searchText.length >=3 && item.name.toLowerCase().includes(searchText.toLowerCase()) && serviceTypes.includes(item.type)
                    }
                  } else if (!district.length && !ward.length && !serviceTypes.length) {
                    if(searchText === '') {
                      return true
                    }
                    else {
                      return searchText.length >=3 && item.name.toLowerCase().includes(searchText.toLowerCase())
                    }
                  }
                })


                
                dispatch(setServiceSearch(searchList))
                dispatch(setServiceType('search'))
              }
              
            }}
          >
            <BiSearch className='text-white w-full font-bold text-2xl flex justify-center'/>
          </button>
        </div>
      </div>
    </div>

    {typeSearch === 'full' &&
      <div ref={recomment} className={`bg-white hidden absolute top-[130%] ${isRegiterServiceLocationPage ? 'w-full left-0 h-[30vh]' : 'w-[150%] left-[-25%] h-[60vh]'}  overflow-scroll border border-solid border-normal rounded-2xl`}>
      <List className='h-full' component="nav" aria-label="main mailbox folders">
        {listPlace && listPlace.length !== 0 ? listPlace.map((item) => {
          if (district.length && ward.length && serviceTypes.length) {
            if (district.includes('Quận ' + item.address.city_district) && ward.includes(item.address.suburb) && serviceTypes.includes(item.type)) {
              d++
              return <SearchElement key={item?.place_id} item={item} recomment={recomment.current} setSelectPosition={setSelectPosition} positionList={positionList} />
            }
          } else if (district.length && ward.length && !serviceTypes.length) {
            if (district.includes('Quận ' + item.address.city_district) && ward.includes(item.address.suburb)) {
              d++
              return <SearchElement handleRegisterLocation={handleRegisterLocation} key={item?.place_id} item={item} recomment={recomment.current} setSelectPosition={setSelectPosition} positionList={positionList} />
            }
          } else if (district.length && !ward.length && serviceTypes.length) {
            if (district.includes('Quận ' + item.address.city_district) && serviceTypes.includes(item.type)) {
              d++
              return <SearchElement handleRegisterLocation={handleRegisterLocation} key={item?.place_id} item={item} recomment={recomment.current} setSelectPosition={setSelectPosition} positionList={positionList} />
            }
          } else if (!district.length && ward.length && serviceTypes.length) {
            if (ward.includes(item.address.suburb) && serviceTypes.includes(item.type)) {
              d++
              return <SearchElement handleRegisterLocation={handleRegisterLocation} key={item?.place_id} item={item} recomment={recomment.current} setSelectPosition={setSelectPosition} positionList={positionList} />
            }
          } else if (district.length && !ward.length && !serviceTypes.length) {
            if (district.includes('Quận ' + item.address.city_district)) {
              d++
              return <SearchElement handleRegisterLocation={handleRegisterLocation} key={item?.place_id} item={item} recomment={recomment.current} setSelectPosition={setSelectPosition} positionList={positionList} />
            }
          } else if (!district.length && ward.length && !serviceTypes.length) {
            if (ward.includes(item.address.suburb)) {
              d++
              return <SearchElement handleRegisterLocation={handleRegisterLocation} key={item?.place_id} item={item} recomment={recomment.current} setSelectPosition={setSelectPosition} positionList={positionList} />
            }
          } else if (!district.length && !ward.length && serviceTypes.length) {
            if (serviceTypes.includes(item.type)) {
              d++
              return <SearchElement handleRegisterLocation={handleRegisterLocation} key={item?.place_id} item={item} recomment={recomment.current} setSelectPosition={setSelectPosition} positionList={positionList} />
            }
          } else if (!district.length && !ward.length && !serviceTypes.length) {
            d++
            return <SearchElement handleRegisterLocation={handleRegisterLocation} key={item?.place_id} item={item} recomment={recomment.current} setSelectPosition={setSelectPosition} positionList={positionList} />
          }


        }) : <div className='h-full flex justify-center items-center'>Không tìm thấy kết quả tìm kiếm</div>}

        {listPlace && listPlace.length!==0 && d === 0 && <div className='h-full flex justify-center items-center'>Không tìm thấy kết quả tìm kiếm</div>}
      </List>
    </div>
    }
  </div>);
}

export default SearchBar;