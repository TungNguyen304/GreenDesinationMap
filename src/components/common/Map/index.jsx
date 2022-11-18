import React, { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import imageApi from "../../../api/imageApi";
import ServiceItem from '../../Home/Service/ServiceItem'
import { useSelector } from "react-redux";
import green from '../../../greenIcon.svg'
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useState } from "react";

const icon = L.icon({
  iconUrl: "https://png.pngtree.com/png-vector/20220706/ourmid/pngtree-vector-location-icon-free-and-png-png-image_5708678.png",
  iconSize: [40, 40],
});

const greenIcon = L.icon({
  iconUrl: "https://png.pngtree.com/png-clipart/20220530/original/pngtree-drop-in-house-location-icon-png-image_7769293.png",
  shadowUrl: "",
  iconSize: [40, 40],
  shadowSize: [30, 30],
  shadowAnchor: [15, 0]
});

const greenIcon2 = L.icon({
  iconUrl: "https://png.pngtree.com/png-clipart/20220530/original/pngtree-drop-in-house-location-icon-png-image_7769293.png",
  shadowUrl: green,
  iconSize: [40, 40],
  shadowSize: [30, 30],
  shadowAnchor: [15, 0]
});


const position = [16.055267597927582, 108.06918916070053];


function ResetCenterView(props) {
  const { selectPosition, serviceRoom } = props;
  const map = useMap()

  useEffect(() => {
    if (selectPosition) {
      map.setView(
        L.latLng(selectPosition?.lat, selectPosition?.lon),
        map.getZoom(),
        {
          animate: true
        }
      )
    }
    else if (serviceRoom) {
      map.setView(
        L.latLng(serviceRoom?.lat, serviceRoom?.lon),
        map.getZoom(),
        {
          animate: true
        }
      )
    }
  })
  return null;
}



function Map(props) {
  const serviceType = useSelector(state => state.serviceReducer.serviceType)
  const { selectPosition, positionList, serviceRoom } = props;
  const locationSelection = [selectPosition?.lat, selectPosition?.lon];
  const locationServiceRoom = [serviceRoom?.lat, serviceRoom?.lon];
  
  return (
    <MapContainer
      className={`z-0 ${window.location.pathname.includes('/detailwishlist') || window.location.pathname.includes('/host/registerservice/location') ? '' : 'rounded-lg'}`}
      center={position}
      zoom={window.location.pathname === 'room' ? 10 : 12}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
        url="https://api.maptiler.com/maps/bright/256/{z}/{x}/{y}.png?key=Xx2LVdpWdk1UyVYRKzN0"
      />

      {selectPosition && (positionList && positionList.every((item) => item.mapid !== selectPosition.place_id)) ? (
        <Marker position={locationSelection} icon={icon}>
          <Popup>
            <div>Không phải địa điểm xanh</div>
          </Popup>
        </Marker>
      ) : <></>}

      {serviceRoom && (
        <Marker position={locationServiceRoom} icon={greenIcon2}>
          <Popup>
            <div>Hello</div>
          </Popup>
        </Marker>
      )}

      {positionList && (
        positionList.map((item, index) => {
          // console.log(serviceType);
          if (serviceType === 'search') {
            return (
              <Marker key={index} position={item} icon={selectPosition && item.mapid === selectPosition.place_id ? greenIcon2 : greenIcon}>
                <Popup>
                  <ServiceItem serviceItem={item} typeComponent="map" id={item.id} typeService={item.type} name={item.name} type="marker" phone={item.phone} star={item.star} address={item.address} />
                </Popup>
              </Marker>
            )
          }
          else if (serviceType === 'noibat') {
            return (
              <Marker key={index} position={item} icon={selectPosition && item.mapid === selectPosition.place_id ? greenIcon2 : greenIcon}>
                <Popup>
                  <ServiceItem serviceItem={item} type="marker" typeComponent="map" id={item.id} typeService={item.type} name={item.name} phone={item.phone} star={item.star} address={item.address} />
                </Popup>
              </Marker>
            )
          }
          else if (serviceType === item.type) {
            return (
              <Marker key={index} position={item} icon={selectPosition && item.mid === selectPosition.place_id ? greenIcon2 : greenIcon}>
                <Popup>
                  <ServiceItem serviceItem={item} typeComponent="map" id={item.id} typeService={item.type} name={item.name} phone={item.phone} star={item.star} address={item.address} />
                </Popup>
              </Marker>
            )
          }
        })
      )}

      <ResetCenterView selectPosition={selectPosition} serviceRoom={serviceRoom} />
    </MapContainer>
  );
}

export default React.memo(Map)