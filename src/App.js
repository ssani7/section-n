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
import VerifyAcc from './Pages/Settiings/VerifyAcc';
import VerificationReq from './Pages/Admin/ManageData/VerificationReq/VerificationReq';
import UserProfile from './Pages/Informations/UserProfile';
import Stars from './Pages/Home/Stars';
import Portfolio from './Pages/Profile/Portfolio/Portfolio';
import EditPortfolio from './Pages/Settiings/EditPortfolio';
import UserPortfolio from './Pages/Informations/UserPortfolio';
import RequireVerified from './Pages/Login/RequireVerified';
import Project from './Pages/Profile/Portfolio/Project';
import Slides from './Pages/Info/Slides';
import Students from './Pages/Us/Students';
import Memes from './Pages/Us/Memes';

function App() {
  // const [theme, setTheme] = useState(localStorage.getItem('theme'));
  const [theme, setTheme] = useTheme();

  return (
    <div data-theme={theme} className="App min-h-screen">
      <Header theme={theme} setTheme={setTheme}></Header>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/students' element={<Students />}></Route>
        <Route path='/slides' element={<Slides />}></Route>
        <Route path='/userProfile/:email/:option' element={<UserProfile />}></Route>
        <Route path='/userPortfolio/:email/:option' element={<UserPortfolio />}></Route>
        <Route path='/project/:email/:index' element={<Project />}></Route>
        <Route path='/achievements/:length' element={<Stars />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/contactCR' element={<ContactCR />}></Route>
        {/* <Route path='/profile' element={<RequireAuth><Profile /></RequireAuth>}></Route> */}
        <Route path='/courses' element={<Courses />}>
          <Route index element={<SemesterView />}></Route>
          <Route index path="/courses/:semesterName" element={<SemesterView />}></Route>
        </Route>

        <Route path='/memes' element={<RequireVerified><Memes /></RequireVerified>}></Route>

        <Route path='/addAchievement' element={<RequireAuth><AddAchievement /></RequireAuth>}></Route>

        <Route path='/manageData' element={<RequireAdmin><ManageData /></RequireAdmin>}>
          <Route index element={<AddAchievement />}></Route>
          <Route path='achvReq' element={<AchvmntReq />}></Route>
          <Route path='addEvent' element={<AddEvent />}></Route>
          <Route path='verifyReq' element={<VerificationReq />}></Route>
        </Route>

        <Route path='/settings' element={<RequireAuth><Settings /></RequireAuth>}>
          <Route index element={<EditProfile />}></Route>
          <Route path='verify' element={<VerifyAcc />}></Route>
          <Route path='addAchvmnt' element={<AddAchievement />}></Route>
        </Route>
        <Route path='/portfolio' element={<RequireVerified> <Portfolio /></RequireVerified>}></Route>
        <Route path='/editPortfolio' element={<RequireAuth><EditPortfolio /></RequireAuth>}></Route>
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
