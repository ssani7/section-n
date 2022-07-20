// import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Register from './Pages/Login/Register';
import Login from './Pages/Login/Login';
import Dummy from './Pages/Home/dummy';
import Profile from './Pages/Profile/Profile';
import RequireAuth from './Pages/Login/RequireAuth';
import useTheme from './hooks/useTheme';
import AddAchievement from './Pages/AddData/AddAchievement';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ManageData from './Pages/Admin/ManageData/ManageData';
import AchvmntReq from './Pages/Admin/ManageData/AchvmentReq/AchvmntReq';
import Settings from './Pages/Settiings/Settings';
import EditProfile from './Pages/Settiings/EditProfile';
import Header from './Pages/Shared/Header/Header';
import NotFound from './Pages/Shared/NotFound/NotFound';
import AddEvent from './Pages/Admin/ManageData/AddEvent';
import RequireAdmin from './Pages/Login/RequireAdmin';
import Courses from './Pages/Courses/Courses';
import SemesterView from './Pages/Courses/SemesterView';
import ContactCR from './Pages/Shared/ContactCR';

function App() {
  // const [theme, setTheme] = useState(localStorage.getItem('theme'));
  const [theme, setTheme] = useTheme();

  return (
    <div data-theme={theme} className="App h-screen">
      <Header theme={theme} setTheme={setTheme}></Header>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/contactCR' element={<ContactCR />}></Route>
        <Route path='/profile' element={<RequireAuth><Profile /></RequireAuth>}></Route>
        <Route path='/courses' element={<RequireAuth><Courses /></RequireAuth>}>
          <Route index element={<SemesterView />}></Route>
          <Route index path="/courses/:semesterName" element={<SemesterView />}></Route>
        </Route>

        <Route path='/addAchievement' element={<RequireAuth><AddAchievement /></RequireAuth>}></Route>

        <Route path='/manageData' element={<RequireAdmin><ManageData /></RequireAdmin>}>
          <Route index element={<AddAchievement />}></Route>
          <Route path='achvReq' element={<AchvmntReq />}></Route>
          <Route path='addEvent' element={<AddEvent />}></Route>
        </Route>

        <Route path='/settings' element={<RequireAuth><Settings /></RequireAuth>}>
          <Route index element={<EditProfile />}></Route>
        </Route>

        <Route path='/dummy' element={<Dummy />}></Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
      <ToastContainer
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />
    </div>
  );
}

export default App;
