import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Register from './Pages/Login/Register';
import Login from './Pages/Login/Login';
import RequireAuth from './Pages/Login/RequireAuth';
import useTheme from './hooks/useTheme';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Pages/Shared/Header/Header';
import NotFound from './Pages/Shared/NotFound/NotFound';
import RequireAdmin from './Pages/Login/RequireAdmin';
import UserProfile from './Pages/User/Profile/UserProfile'
import RequireVerified from './Pages/Login/RequireVerified';
import Students from './Pages/Info/Students/Students';
import ManageData from './Pages/Admin/ManageData';
import Memes from './Pages/Memes/Memes';
import UserPortfolio from './Pages/User/Portfolio/UserPortfolio';
import EditPortfolio from './Pages/User/Settiings/EditPortfolio';
import AchvmntReq from './Pages/Admin/AchvmentReq/AchvmntReq';
import AddEvent from './Pages/Admin/Event/AddEvent';
import VerificationReq from './Pages/Admin/VerificationReq/VerificationReq';
import Courses from './Pages/Info/Courses/Courses';
import SemesterView from './Pages/Info/Courses/SemesterView';
import Portfolio from './Pages/User/Portfolio/Portfolio';
import Project from './Pages/User/Portfolio/Project';
import EditProfile from './Pages/User/Settiings/EditProfile';
import Settings from './Pages/User/Settiings/Settings';
import VerifyAcc from './Pages/User/Settiings/VerifyAcc';
import { UserProvider } from './Contexts/UserContex';
import ContactCR from './Pages/Shared/Footer/ContactCR';
import Stars from './Pages/Info/Achievements/Stars';
import AddAchievement from './Pages/Info/Achievements/AddAchievement';
import Semesters from './Pages/Info/Slides/Gdrive/Semesters';
import CourseView from './Pages/Info/Slides/Gdrive/CourseView';
import Slides from './Pages/Info/Slides/Gdrive/Slides';

function App() {
  const [theme, setTheme] = useTheme();

  return (
    <div data-theme={theme} className="App min-h-screen">
      <UserProvider>
        <Header theme={theme} setTheme={setTheme}></Header>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/students' element={<Students />}></Route>
          <Route path='/userProfile/:email/:option' element={<UserProfile />}></Route>
          <Route path='/userPortfolio/:email/:option' element={<UserPortfolio />}></Route>
          <Route path='/project/:email/:index' element={<Project />}></Route>
          <Route path='/achievements/:length' element={<Stars />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/contactCR' element={<ContactCR />}></Route>
          <Route path='/courses/:semesterName' element={<Courses />}>
            <Route index element={<SemesterView />}></Route>
            <Route path="semesterName" element={<SemesterView />}></Route>
          </Route>
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

          <Route path='/slides' element={<Semesters />}></Route >
          <Route path='/slides/semester/:name/:id' element={<CourseView />}></Route>
          <Route path='/slides/courses/:name/:id' element={<Slides />}></Route>

          {/* memes */}
          <Route path='/memes/:postId' element={<RequireVerified><Memes /></RequireVerified>}></Route>
          <Route path='/memes' element={<RequireVerified><Memes /></RequireVerified>}></Route>

          <Route path='*' element={<NotFound />}></Route>

        </Routes>
      </UserProvider>
      <ToastContainer
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />
    </div>
  );
}

export default App;
