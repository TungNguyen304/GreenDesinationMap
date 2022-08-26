import { publicRouters } from './router';

import './App.css';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <Routes>
        {publicRouters.map((item) => <Route path={item.path} element={<item.component/>}/>)}
      </Routes>
    </div>
  );
}

export default App;
