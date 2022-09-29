import {BiSearch} from 'react-icons/bi'
import React, { useEffect, useState } from "react";
import List from "@material-ui/core/List";
import serviceApi from '../../../../api/serviceApi';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { useRef } from 'react';

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";

function SearchBar({hidden, ...props}) {
    const { setSelectPosition } = props;
    const [positionList, setPositionList] = useState()
    useEffect(() => {
      (async() => {
          const data = await serviceApi.getAll()
          setPositionList(data.data)
      })()
  }, [])
    const [searchText, setSearchText] = useState("");
    const [listPlace, setListPlace] = useState([]);
    const recomment = useRef()
    function removeClass() {
        recomment.current && recomment.current.classList.add('hidden')
        window.removeEventListener('click', removeClass)
    }
    function handleDisplayTippy(even) {
        const newArr = [...recomment.current.classList]
        if(newArr.includes('hidden')) {
            recomment.current && recomment.current.classList.remove('hidden')
            even.stopPropagation();
            window.addEventListener('click', removeClass)
        }
    }

    return ( <div className={`${hidden || "flex"} hover:shadow-normal rounded-full`} style={{position: "relative", flexDirection: "column"}}>
      <div style={{ display: "flex", justifyContent: "space-between", borderRadius: "50px", padding: "8px 10px 8px 20px", height: "100%", border: "1px solid var(--border)"}}>
        <div className='w-[400px]'>
          <input
            className='placeholder:italic'
            placeholder='Tìm kiếm ở đây ...'
            style={{ width: "100%",height: "100%"}}
            value={searchText}
            onChange={(event) => {
              setSearchText(event.target.value);
            }}
          />
        </div>
        <div
          style={{ display: "flex", alignItems: "center", borderRadius: "100%", overflow: "hidden", width: "38px"}}
        >
          <button
            variant="contained"
            style={{backgroundColor: "var(--primary)", padding: '6px'}}
            className='h-full rounded-full w-full flex justify-center items-center hover:opacity-90 active:scale-[0.9]'
            onClick={(e) => {
              // Search
              searchText && handleDisplayTippy(e)
              const params = {
                q: searchText,
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
            }}
          >
              <BiSearch className='text-white w-full font-bold text-2xl flex justify-center'/>
          </button>
        </div>
      </div>
      <div ref={recomment} className='bg-white hidden absolute top-[130%] w-[150%] left-[-25%] h-[60vh] overflow-scroll border border-solid border-normal rounded-2xl'>
        <List className='h-full' component="nav" aria-label="main mailbox folders">
          {listPlace && listPlace.length ? listPlace.map((item) => {
            return (
              <div key={item?.place_id}>
                <ListItem
                  button
                  onClick={() => {
                    console.log(item);
                    recomment.current.classList.add("hidden")
                    setSelectPosition(item);
                  }}
                >
                  <ListItemIcon>
                    <img
                      src={positionList.some((element) => element.mapid === item.place_id) ? "https://png.pngtree.com/png-clipart/20220530/original/pngtree-drop-in-house-location-icon-png-image_7769293.png" : "https://png.pngtree.com/png-vector/20220706/ourmid/pngtree-vector-location-icon-free-and-png-png-image_5708678.png"}
                      alt="Placeholder"
                      style={{ width: 38, height: 38 }}
                    />
                  </ListItemIcon>
                  <ListItemText primary={item?.display_name} />
                </ListItem>
                <Divider />
              </div>
            );
          }) : <div className='h-full flex justify-center items-center'>Không tìm thấy kết quả tìm kiếm</div>}
        </List>
      </div>
    </div>);
}

export default SearchBar;