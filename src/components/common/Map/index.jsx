import React, { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import green from '../../../greenIcon.svg'
import "leaflet/dist/leaflet.css";
import L from "leaflet";

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
  const { selectPosition } = props;
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
    }})
  return null;
}



export default function Maps(props) {
  const { selectPosition, positionList } = props;
  const locationSelection = [selectPosition?.lat, selectPosition?.lon];
  return (
    <MapContainer
      className="z-0 rounded-lg"
      center={position}
      zoom={12}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
        url="https://api.maptiler.com/maps/bright/256/{z}/{x}/{y}.png?key=Xx2LVdpWdk1UyVYRKzN0"
      />

      {selectPosition && positionList.every((item) => item.id !== selectPosition.place_id) ? (
        <Marker position={locationSelection} icon={icon}>
          <Popup>
            <div>Hello</div>
          </Popup>
        </Marker>
      ) : <></> }

      {positionList && (
        positionList.map((item, index) => {
          return (
            <Marker key={index} position={item} icon={selectPosition && item.id === selectPosition.place_id ? greenIcon2 : greenIcon}>
              <Popup>
                <div>Hello</div>
            </Popup>
            </Marker>
          )
        })
      )}

      <ResetCenterView selectPosition={selectPosition} />
    </MapContainer>
  );
}

