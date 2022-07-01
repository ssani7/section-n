import logo from './logo.svg';
import './App.css';
import Header from './Pages/Shared/Header/Header';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Register from './Pages/Login/Register';
import Login from './Pages/Login/Login';
import { useState } from 'react';
import Dummy from './Pages/Home/dummy';
import Header2 from './Pages/Shared/Header/Header2';
import Profile from './Pages/Profile/Profile';
import RequireAuth from './Pages/Login/RequireAuth';

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme'));

  return (
    <div data-theme={theme === 'dark' ? "black" : 'mytheme'} className="App h-screen">
      {/* <Header theme={theme} setTheme={setTheme}></Header> */}
      <Header2 theme={theme} setTheme={setTheme}></Header2>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/profile' element={<RequireAuth><Profile /></RequireAuth>}></Route>
        <Route path='/dummy' element={<Dummy />}></Route>
      </Routes>
    </div>
  );
}

export default App;
