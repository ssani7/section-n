import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { UserProvider } from './Contexts/UserContex';
import AchvmntReq from './Pages/Admin/AchvmentReq/AchvmntReq';
import AddEvent from './Pages/Admin/Event/AddEvent';
import ManageData from './Pages/Admin/ManageData';
import VerificationReq from './Pages/Admin/VerificationReq/VerificationReq';
import Home from './Pages/Home/Home';
import AddAchievement from './Pages/Info/Achievements/AddAchievement';
import Stars from './Pages/Info/Achievements/Stars';
import Courses from './Pages/Info/Courses/Courses';
import SemesterView from './Pages/Info/Courses/SemesterView';
import CourseView from './Pages/Info/Slides/Gdrive/CourseView';
import Semesters from './Pages/Info/Slides/Gdrive/Semesters';
import Slides from './Pages/Info/Slides/Gdrive/Slides';
import Students from './Pages/Info/Students/Students';
import Login from './Pages/Login/Login';
import Register from './Pages/Login/Register';
import RequireAdmin from './Pages/Login/RequireAdmin';
import RequireAuth from './Pages/Login/RequireAuth';
import RequireVerified from './Pages/Login/RequireVerified';
import Memes from './Pages/Memes/Memes';
import NotFound from './Pages/Shared/NotFound/NotFound';
import Portfolio from './Pages/User/Portfolio/Portfolio';
import Project from './Pages/User/Portfolio/Project';
import UserPortfolio from './Pages/User/Portfolio/UserPortfolio';
import UserProfile from './Pages/User/Profile/UserProfile';
import EditPortfolio from './Pages/User/Settiings/EditPortfolio';
import EditProfile from './Pages/User/Settiings/EditProfile';
import Settings from './Pages/User/Settiings/Settings';
import VerifyAcc from './Pages/User/Settiings/VerifyAcc';
import ContactCR from './components/shared/Footer/ContactCR';
import Navbar from './components/shared/Header/Header';
import useTheme from './hooks/useTheme';

function App() {
	const [theme, setTheme] = useTheme();

	return (
		<div data-theme={theme} className="App min-h-screen">
			<UserProvider>
				<Navbar theme={theme} setTheme={setTheme} />
				<Routes>
					<Route path="/" element={<Home />}></Route>
					<Route path="/home" element={<Home />}></Route>
					<Route path="/students" element={<Students />}></Route>
					<Route path="/userProfile/:email/:option" element={<UserProfile />}></Route>
					<Route path="/userPortfolio/:email/:option" element={<UserPortfolio />}></Route>
					<Route path="/project/:email/:index" element={<Project />}></Route>
					<Route path="/achievements/:length" element={<Stars />}></Route>
					<Route path="/register" element={<Register />}></Route>
					<Route path="/login" element={<Login />}></Route>
					<Route path="/contactCR" element={<ContactCR />}></Route>
					<Route path="/courses/:semesterName" element={<Courses />}>
						<Route index element={<SemesterView />}></Route>
						<Route path="semesterName" element={<SemesterView />}></Route>
					</Route>
					<Route
						path="/addAchievement"
						element={
							<RequireAuth>
								<AddAchievement />
							</RequireAuth>
						}></Route>
					<Route
						path="/manageData"
						element={
							<RequireAdmin>
								<ManageData />
							</RequireAdmin>
						}>
						<Route index element={<AddAchievement />}></Route>
						<Route path="achvReq" element={<AchvmntReq />}></Route>
						<Route path="addEvent" element={<AddEvent />}></Route>
						<Route path="verifyReq" element={<VerificationReq />}></Route>
					</Route>

					<Route
						path="/settings"
						element={
							<RequireAuth>
								<Settings />
							</RequireAuth>
						}>
						<Route index element={<EditProfile />}></Route>
						<Route path="verify" element={<VerifyAcc />}></Route>
						<Route path="addAchvmnt" element={<AddAchievement />}></Route>
					</Route>
					<Route
						path="/portfolio"
						element={
							<RequireVerified>
								{' '}
								<Portfolio />
							</RequireVerified>
						}></Route>
					<Route
						path="/editPortfolio"
						element={
							<RequireAuth>
								<EditPortfolio />
							</RequireAuth>
						}></Route>

					<Route path="/slides" element={<Semesters />}></Route>
					<Route path="/slides/semester/:name/:id" element={<CourseView />}></Route>
					<Route path="/slides/courses/:name/:id" element={<Slides />}></Route>

					{/* memes */}
					<Route
						path="/memes/:postId"
						element={
							<RequireVerified>
								<Memes />
							</RequireVerified>
						}></Route>
					<Route
						path="/memes"
						element={
							<RequireVerified>
								<Memes />
							</RequireVerified>
						}></Route>

					<Route path="*" element={<NotFound />}></Route>
				</Routes>
			</UserProvider>
			<ToastContainer pauseOnFocusLoss={false} pauseOnHover={false} />
		</div>
	);
}

export default App;
