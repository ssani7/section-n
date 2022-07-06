import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Register from './Pages/Login/Register';
import Login from './Pages/Login/Login';
import Dummy from './Pages/Home/dummy';
import Header2 from './Pages/Shared/Header/Header2';
import Profile from './Pages/Profile/Profile';
import RequireAuth from './Pages/Login/RequireAuth';
import useTheme from './hooks/useTheme';
import AddAchievement from './Pages/AddData/AddAchievement';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ManageData from './Pages/Admin/ManageData/ManageData';
import AchvmntReq from './Pages/Admin/ManageData/AchvmentReq/AchvmntReq';

function App() {
  // const [theme, setTheme] = useState(localStorage.getItem('theme'));
  const [theme, setTheme] = useTheme();

  return (
    <div data-theme={theme} className="App h-screen">
      <Header2 theme={theme} setTheme={setTheme}></Header2>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/profile' element={<RequireAuth><Profile /></RequireAuth>}></Route>
        <Route path='/addAchievement' element={<RequireAuth><AddAchievement /></RequireAuth>}></Route>
        <Route path='/manageData' element={<RequireAuth><ManageData /></RequireAuth>}>
          <Route index element={<AddAchievement />}></Route>
          <Route path='achvReq' element={<AchvmntReq />}></Route>

        </Route>
        <Route path='/dummy' element={<Dummy />}></Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
