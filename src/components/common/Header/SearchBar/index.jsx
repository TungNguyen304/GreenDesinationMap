import { BiSearch } from 'react-icons/bi'
import { GiHamburgerMenu } from 'react-icons/gi'
import React, { useEffect, useState } from "react";
import List from "@material-ui/core/List";
import { useDispatch } from 'react-redux';
import { useMenuMobileContext } from '../../../../hook';
import { setServiceSearch } from '../../../../store/actions/search';
import { setServiceType } from '../../../../store/actions/service';
import serviceApi from '../../../../api/serviceApi';
import { useSelector } from 'react-redux';
import SearchElement from './SearchElement';
import { useRef } from 'react';

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";

function SearchBar({ hidden, ...props }) {
  const context = useMenuMobileContext()
  const dispatch = useDispatch()
  const isUserHomePage = window.location.pathname === "/"
  const isLocationPage = window.location.pathname.includes('/location/')
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
      const data = await serviceApi.getGreenService()
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

  function addWard(address) {
    if(!address.includes("Ph?????ng")) {
      return "Ph?????ng " + address
    }

    return address
  }

  function addDistrict(address) {
    if(!address.includes("Qu???n")) {
      return "Qu???n " + address
    }

    return address
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
    if ((newAddress.includes('???? n???ng') === false && newAddress.includes('da nang') === false) && (newAddress.includes('vi???t nam') === false && newAddress.includes('viet nam') === false)) {
      return newAddress + ', ???? n???ng, vi???t nam'
    }
    else if ((newAddress.includes('???? n???ng') || newAddress.includes('da nang')) && (newAddress.includes('vi???t nam') === false && newAddress.includes('viet nam') === false)) {
      return newAddress + ', vi???t nam'
    }
    else if ((newAddress.includes('???? n???ng') === false && newAddress.includes('da nang') === false) && (newAddress.includes('vi???t nam') || newAddress.includes('viet nam'))) {
      return newAddress + ', ???? n???ng'
    }
    return newAddress
  }

  return (<div className={`flex flex-1`} style={{ position: "relative", flexDirection: "column" }}>
    <div className={`flex items-center sm:flex-1 ${isUserHomePage ? 'justify-center':''} min640max1024:justify-around`}>
      
      <div className={`${window.location.pathname.includes('/host') || hidden || !isUserHomePage ? 'hidden' : 'md:block'} hidden mr-5 text-xs text-center cursor-pointer italic rounded-full relative select-none`}>
        <div ref={greenRef3} onClick={handleChangeSearchType} className='flex bg-[#989999] text-white font-medium rounded-full hover:opacity-90'>
          <div ref={greenRef1} style={{ transition: "all 0.5s ease-in-out", opacity: 0 }} className={`py-3 pl-3 pr-[6px] `}>
            ?????a ??i???m xanh
          </div>
          <div ref={greenRef2} style={{ transition: "all 0.5s ease-in-out", opacity: 1 }} className='py-3 pr-3 pl-[6px] '>
            ?????a ??i???m xanh
          </div>
        </div>
        <div style={{ transition: "all 0.3s ease-in", left: 0 }} ref={changeSearchTypeRef} className='py-1 px-3 font-medium w-[50%] h-[115%] bg-green-600 rounded-full flex items-center text-white absolute top-[-10%] left-0'>
          To??n b???n ?????
        </div>
      </div>

      <div onClick={context} className={`p-3 text-2xl hover:bg-slate-100 relative hidden ${isLocationPage ? "" : "ssm767:block"}`}>
        <GiHamburgerMenu className='text-[#6d6b6b]'/>
      </div>
      
      <div style={{ justifyContent: "space-between", borderRadius: "50px", padding: "8px 10px 8px 20px", height: "100%", border: "1px solid var(--border)" }} className={`bg-white hover:shadow-normal rounded-full ${hidden ? 'hidden' : 'flex'} ${isRegiterServiceLocationPage ? 'w-full' : 'w-[50%] ssm640:w-full'}`}>
        <div className='w-full'>
          <input
            className='placeholder:italic'
            placeholder={typeSearch === 'full' ? 'T??m ki???m ??? ????y ...(TP ???? N???ng, Vi???t Nam)' : 'T??m ki???m ??? ????y ...(T??m theo t??n, ??t nh???t 3 k?? t???)'}
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
            style={{ backgroundColor: "var(--primary)" }}
            className='h-full rounded-full w-full flex justify-center items-center hover:opacity-90 active:scale-[0.9] p-[5px] slg1250:p-[6px]'
            onClick={(e) => {
              console.log(district, ward, serviceTypes);
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
                const requestOptions = {
                  method: "GET",
                  redirect: "follow",
                };
                fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
                  .then((response) => response.text())
                  .then((result) => {
                    console.log(JSON.parse(result));
                      setListPlace(JSON.parse(result))
                  })
                  .catch((err) => console.log("err: ", err));
              }
              else {
                const searchList = positionList.filter((item) => {
                  if (district.length && ward.length && serviceTypes.length) {
                    if (searchText === '') {
                      return district.includes('Qu???n ' + item.district) && ward.includes('Ph?????ng ' + item.ward) && serviceTypes.includes(item.type)
                    }
                    else {
                      return searchText.length >= 3 && item.name.toLowerCase().includes(searchText.toLowerCase()) && district.includes('Qu???n ' + item.district) && ward.includes('Ph?????ng ' + item.ward) && serviceTypes.includes(item.type)
                    }
                  } else if (district.length && ward.length && !serviceTypes.length) {
                    if (searchText === '') {
                      return district.includes('Qu???n ' + item.district) && ward.includes('Ph?????ng ' + item.ward)
                    }
                    else {
                      return searchText.length >= 3 && item.name.toLowerCase().includes(searchText.toLowerCase()) && district.includes('Qu???n ' + item.district) && ward.includes('Ph?????ng ' + item.ward)
                    }
                  } else if (district.length && !ward.length && serviceTypes.length) {
                    if (searchText === '') {
                      return district.includes('Qu???n ' + item.district) && serviceTypes.includes(item.type)
                    }
                    else {
                      return searchText.length >= 3 && item.name.toLowerCase().includes(searchText.toLowerCase()) && district.includes('Qu???n ' + item.district) && serviceTypes.includes(item.type)
                    }
                  } else if (!district.length && ward.length && serviceTypes.length) {
                    if (searchText === '') {
                      return ward.includes('Ph?????ng ' + item.ward) && serviceTypes.includes(item.type)
                    }
                    else {
                      return searchText.length >= 3 && item.name.toLowerCase().includes(searchText.toLowerCase()) && ward.includes('Ph?????ng ' + item.ward) && serviceTypes.includes(item.type)
                    }
                  } else if (district.length && !ward.length && !serviceTypes.length) {
                    if (searchText === '') {
                      return district.includes('Qu???n ' + item.district)
                    }
                    else {
                      return searchText.length >= 3 && item.name.toLowerCase().includes(searchText.toLowerCase()) && district.includes('Qu???n ' + item.district)
                    }
                  } else if (!district.length && ward.length && !serviceTypes.length) {
                    if (searchText === '') {
                      return ward.includes('Ph?????ng ' + item.ward)
                    }
                    else {
                      return searchText.length >= 3 && item.name.toLowerCase().includes(searchText.toLowerCase()) && ward.includes('Ph?????ng ' + item.ward)
                    }
                  } else if (!district.length && !ward.length && serviceTypes.length) {
                    if (searchText === '') {
                      return serviceTypes.includes(item.type)
                    }
                    else {
                      return searchText.length >= 3 && item.name.toLowerCase().includes(searchText.toLowerCase()) && serviceTypes.includes(item.type)
                    }
                  } else if (!district.length && !ward.length && !serviceTypes.length) {
                    if (searchText === '') {
                      return true
                    }
                    else {
                      return searchText.length >= 3 && item.name.toLowerCase().includes(searchText.toLowerCase())
                    }
                  }
                })



                dispatch(setServiceSearch(searchList))
                dispatch(setServiceType('search'))
              }

            }}
          >
            <BiSearch className='text-white w-full font-bold text-2xl flex justify-center' />
          </button>
        </div>
      </div>
    </div>

    {typeSearch === 'full' &&
      <div ref={recomment} className={`bg-white hidden absolute top-[130%] ${isRegiterServiceLocationPage ? 'left-0 h-[30vh]' : 'min640max1024:left-[50%] min640max1024:translate-x-[-25%] left-[5%] h-[60vh]'} w-[100%] overflow-scroll border border-solid border-normal rounded-2xl ssm640:left-0 `}>
        <List className='h-full' component="nav" aria-label="main mailbox folders">
          {listPlace && listPlace.length !== 0 ? listPlace.map((item) => {
            if (district.length && ward.length && serviceTypes.length) {
              if (district.includes(addDistrict(item.address.city_district)) && ward.includes(addWard(item.address.suburb)) && serviceTypes.includes(item.type)) {
                d++
                return <SearchElement key={item?.place_id} item={item} recomment={recomment.current} setSelectPosition={setSelectPosition} positionList={positionList} />
              }
            } else if (district.length && ward.length && !serviceTypes.length) {
              if(district.includes(addDistrict(item.address.city_district))) {
                console.log(ward, addWard(item.address.suburb));
              }
              if (district.includes(addDistrict(item.address.city_district)) && ward.includes(addWard(item.address.suburb))) {
                d++
                return <SearchElement handleRegisterLocation={handleRegisterLocation} key={item?.place_id} item={item} recomment={recomment.current} setSelectPosition={setSelectPosition} positionList={positionList} />
              }
            } else if (district.length && !ward.length && serviceTypes.length) {
              if (district.includes(addDistrict(item.address.city_district)) && serviceTypes.includes(item.type)) {
                d++
                return <SearchElement handleRegisterLocation={handleRegisterLocation} key={item?.place_id} item={item} recomment={recomment.current} setSelectPosition={setSelectPosition} positionList={positionList} />
              }
            } else if (!district.length && ward.length && serviceTypes.length) {
              if (ward.includes(addWard(item.address.suburb)) && serviceTypes.includes(item.type)) {
                d++
                return <SearchElement handleRegisterLocation={handleRegisterLocation} key={item?.place_id} item={item} recomment={recomment.current} setSelectPosition={setSelectPosition} positionList={positionList} />
              }
            } else if (district.length && !ward.length && !serviceTypes.length) {
              if (district.includes(addDistrict(item.address.city_district))) {
                d++
                return <SearchElement handleRegisterLocation={handleRegisterLocation} key={item?.place_id} item={item} recomment={recomment.current} setSelectPosition={setSelectPosition} positionList={positionList} />
              }
            } else if (!district.length && ward.length && !serviceTypes.length) {
              if (ward.includes(addWard(item.address.suburb))) {
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
          }) : <div className='h-full flex justify-center items-center'>Kh??ng t??m th???y k???t qu??? t??m ki???m</div>}

          {listPlace && listPlace.length !== 0 && d === 0 && <div className='h-full flex justify-center items-center'>Kh??ng t??m th???y k???t qu??? t??m ki???m</div>}
        </List>
      </div>
    }
  </div>);
}

export default SearchBar;