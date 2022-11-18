import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

function SearchElement({item, recomment, positionList, setSelectPosition, handleRegisterLocation}) {
    return ( <div >
        <ListItem
          button
          onClick={() => {
            recomment.classList.add("hidden")
            setSelectPosition && setSelectPosition(item);
            handleRegisterLocation && handleRegisterLocation(item)
          }}
        >
          <ListItemIcon>
            <img
              src={positionList && positionList.some((element) => element.mapid === item.place_id) ? "https://png.pngtree.com/png-clipart/20220530/original/pngtree-drop-in-house-location-icon-png-image_7769293.png" : "https://png.pngtree.com/png-vector/20220706/ourmid/pngtree-vector-location-icon-free-and-png-png-image_5708678.png"}
              alt="Placeholder"
              style={{ width: 38, height: 38 }}
            />
          </ListItemIcon>
          <ListItemText primary={item?.display_name} />
        </ListItem>
        <Divider />
      </div> );
}

export default SearchElement;