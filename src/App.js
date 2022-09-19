import { publicRouters } from './router';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setshowdisplay } from './store/actions/bigbox';
import { setshowhidden } from './store/actions/bigbox';
import { createContext } from "react";
import { useState } from 'react';



export const bigBoxContext = createContext()

function App() {
  const dispatch = useDispatch()
  const show = useSelector(state => state.bigboxReducer.show)
  const [title, setTitle] = useState('')
  const [type, setType] = useState('')
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
