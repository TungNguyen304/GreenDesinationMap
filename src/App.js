import { publicRouters } from './router';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import accountApi from './api/accountApi';
import { setshowdisplay, setshowhidden } from './store/actions/bigbox';
import { setUser, setSupplier } from './store/actions/account';
import { createContext, useEffect } from "react";
import { useState } from 'react';



export const bigBoxContext = createContext()

function App() {
  useEffect(() => {
    window.scroll(0, 0)
  })


  
  const dispatch = useDispatch()
  const show = useSelector(state => state.bigboxReducer.show)
  const [title, setTitle] = useState('')
  const [type, setType] = useState('')

  useEffect(() => {
    const cookie = document.cookie.split("; ")
    cookie.forEach((item) => {
      if(item.includes('user_id')) {
        (async () => {
          const res = await accountApi.get(Number(item.split("=")[1]))
          dispatch(setUser(res.data))
        })()
      }

      if(item.includes('supplier_id')) {
        (async () => {
          const res = await accountApi.get(Number(item.split("=")[1]))
          dispatch(setSupplier(res.data))
        })()
      }
    })
  }, [])

  function handleDisplayBigBox() {
    if(show) {
        dispatch(setshowhidden(false))
    }
    else
        dispatch(setshowdisplay(true))
}

function handleSetBigBox(title, type) {
    setTitle(title)
    setType(type)
}

const bigBoxEvent = {
    handleDisplayBigBox,
    handleSetBigBox
}
  return (
    <bigBoxContext.Provider value={bigBoxEvent}>
      <Routes>
          {publicRouters.map((item) => <Route key={item.path} path={item.path} element={<item.component type={type} title={title}/>}/>)}
      </Routes>
    </bigBoxContext.Provider>
  );
}

export default App;
