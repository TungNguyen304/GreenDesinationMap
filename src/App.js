import { publicRouters } from "./router";
import { Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import accountApi from "./api/accountApi";
import { setshowdisplay, setshowhidden } from "./store/actions/bigbox";
import { setUser, setSupplier } from "./store/actions/account";
import MenuMobile from "./components/common/MenuMobile";
import { createContext, useEffect, useRef } from "react";
import { useState } from "react";
import BigLoader from "./components/common/BigLoader";

export const menuMobileContext = createContext();

export const bigBoxContext = createContext();

function App() {
  useEffect(() => {
    window.scroll(0, 0);
  });

  const dispatch = useDispatch();
  const loadRef = useRef();
  const show = useSelector((state) => state.bigboxReducer.show);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const wrapMenuRef = useRef();
  const menuRef = useRef();

  // useEffect(() => {
  //   const cookie = document.cookie.split("; ");
  //   cookie.forEach((item) => {
  //     if (item.includes("user_id")) {
  //       (async () => {
  //         const res = await accountApi.get(Number(item.split("=")[1]));
  //         dispatch(setUser(res.data));
  //       })();
  //     }

  //     if (item.includes("supplier_id")) {
  //       (async () => {
  //         const res = await accountApi.get(Number(item.split("=")[1]));
  //         dispatch(setSupplier(res.data));
  //       })();
  //     }
  //   });
  // }, []);

  useEffect(() => {
    (async () => {
      const user = localStorage.getItem("user");
      const supplier = localStorage.getItem("supplier");
      if (user) {
        const userdata = await accountApi.getLogin({}, user).catch((err) => {});
        if (userdata) {
          dispatch(setUser(userdata.data));
        }
      }
      if (supplier) {
        const supplierdata = await accountApi
          .getLogin({}, supplier)
          .catch((err) => {});
        if (supplierdata) {
          dispatch(setSupplier(supplierdata.data));
        }
      }
    })();
  }, []);

  function handleDisplayBigBox() {
    if (show) {
      dispatch(setshowhidden(false));
    } else dispatch(setshowdisplay(true));
  }

  function handleSetBigBox(title, type) {
    setTitle(title);
    setType(type);
  }

  function handleDisplayMenuMobile() {
    wrapMenuRef.current.classList.toggle("hidden");
  }

  const bigBoxEvent = {
    handleDisplayBigBox,
    handleSetBigBox,
    "loadRef": loadRef.current,
  };

  const checkLoginUser = localStorage.getItem("user");
  const checkLoginSupplier = localStorage.getItem("supplier");

  return (
    <menuMobileContext.Provider value={handleDisplayMenuMobile}>
      <bigBoxContext.Provider value={bigBoxEvent}>
        <Routes>
          {publicRouters.map((item) => {
            if (item.path === "/host" || item.path === "/" || item.path.includes("/room/")) {
              return <Route
                key={item.path}
                path={item.path}
                element={
                    <item.component type={type} title={title} />
                }
              />;
            } 
            else if (item.path.includes("/host")) {
              return (
                <Route
                  key={item.path}
                  path={item.path}
                  element={
                    checkLoginSupplier ? (
                      <item.component type={type} title={title} />
                    ) : (
                      <Navigate to="/host" />
                    )
                  }
                />
              );
            } else {
              return (
                <Route
                  key={item.path}
                  path={item.path}
                  element={
                    checkLoginUser ? (
                      <item.component type={type} title={title} />
                    ) : (
                      <Navigate to="/" />
                    )
                  }
                />
              );
            }
          })}
        </Routes>
        <div ref={wrapMenuRef} className="hidden">
          <MenuMobile
            handleDisplayMenuMobile={handleDisplayMenuMobile}
            ref={menuRef}
          />
        </div>
        <div ref={loadRef} className="hidden">
          <BigLoader/>
        </div>
      </bigBoxContext.Provider>
    </menuMobileContext.Provider>
  );
}

export default App;
