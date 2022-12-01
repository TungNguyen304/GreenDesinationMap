import classNames from "classnames/bind";
import { useRef } from "react";
import styles from "./floatbox.module.scss"
import {IoNotificationsCircleOutline} from "react-icons/io5"
const cx= classNames.bind(styles)

function FloatBox() {
  const refModal =useRef()
  window.onclick = function (event) {
    if (event.target === refModal.current) {
      refModal.current.style.display = "none";
    }
  };
    return (
      <div id="myModal" ref={refModal} className={`${cx("modal")}`}>
        <div className={`${cx("modal-content")}`}>
          <span
            className={`${cx("close")}`}
            onClick={(e) => {
              refModal.current.style.display = "none";
            }}
          >
            ×
          </span>
          <p>
            <p className="flex justify-center"><IoNotificationsCircleOutline size={100} color="#a81818"></IoNotificationsCircleOutline></p>
            <h3 className="text-center text-[24px] h-10 leading-10 mb-3 font-light">
              Bạn có muốn xóa không!!!
            </h3>
            <p className="flex justify-around">
              <button className="bg-green-600 text-white w-[40%] p-2 font-light rounded-md">
                YES
              </button>
              <button className="bg-black text-white w-[40%] p-2 font-light rounded-md">
                NO
              </button>
            </p>
          </p>
        </div>
      </div>
    );
}

export default FloatBox;