import { publicRouters } from './router';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
        {publicRouters.map((item) => <Route key={item.path} path={item.path} element={<item.component/>}/>)}
    </Routes>
  );
}

export default App;
