import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { useCallback } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useMatch, useNavigate, useResolvedPath } from "react-router-dom";
import { useUserContext } from "../../../Contexts/UserContex";
import auth from "../../../firebase.init";
import useAdmin from "../../../hooks/useAdmin";
import useToken from "../../../hooks/useToken";

const Header = ({ theme, setTheme }) => {
  const [navBg, setChangeBg] = useState(false);
  const [collapse, setCollapse] = useState(false);
  const [usCollapse, setUsCollapse] = useState(false);

  const [user, loading] = useAuthState(auth);
  const { userData, loadingData } = useUserContext();
  const [isAdmin, adminLoading] = useAdmin();

  function CustomLink({ children, to, ...props }) {
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: true });

    return (
      <div>
        <Link
          // style={match && { textDecoration: "underline" }}
          className={`${match && "text-primary"}`}
          to={to}
          {...props}
        >
          {children}
        </Link>
      </div>
    );
  }

  const handleSignOut = () => {
    const confirm = window.confirm("Are You Sure To Sign Out?");
    if (confirm) {
      signOut(auth);
      localStorage.removeItem("access-token");
    }
  };

  const checked = (value) => {
    if (value) {
      setTheme("darkTheme");
      localStorage.setItem("theme", "darkTheme");
    } else {
      setTheme("mytheme");
      localStorage.setItem("theme", "mytheme");
    }
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY >= 20) {
      setChangeBg(true);
    } else {
      setChangeBg(false);
    }
  });

  let systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

  useEffect(() => {
    systemTheme.addEventListener("change", (e) => checked(e.target.matches));
  }, [systemTheme]);

  if (
    window.matchMedia("(prefers-color-scheme : dark)").matches &&
    localStorage.getItem("theme") == null
  ) {
    setTheme("darkTheme");
    localStorage.setItem("theme", "darkTheme");
  }

  return (
    <div
      className={`navbar ${
        navBg ? "bg-base-300" : "bg-transparent"
      } fixed top-0 z-40 px-3 md:px-6 transition-all duration-700`}
    >
      <div className="flex-1">
        <Link
          to="/"
          className="font-bold normal-case text-lg md:text-3xl great-vibes"
        >
          Section N
        </Link>
      </div>
      <div className="flex justify-end w-2/3 md:w-1/2 xl:w-1/4">
        <div className="relative">
          <input
            type="checkbox"
            onChange={(e) => setUsCollapse(e.target.checked)}
            checked={usCollapse}
            className="hidden"
          />

          <span
            onClick={() => setUsCollapse(!usCollapse)}
            onBlur={() => setUsCollapse(false)}
            className="hover:scale-105 font-bold text-sm md:text-xl my-auto mx-3 md:mx-5 flex items-center cursor-pointer group select-none whitespace-nowrap"
          >
            Us
            <FontAwesomeIcon
              icon={faAngleDown}
              className={`ml-2 group-hover:scale-105 transition-all ${
                usCollapse && "rotate-180"
              }`}
            />
          </span>

          <ul
            className={`absolute text-sm bg-base-100 flex flex-col mt-4 rounded-xl h-auto cursor-pointer p-2 shadow-lg transform transition-all ${
              usCollapse || "invisible scale-0"
            }`}
          >
            <CustomLink to="/students">
              <li
                onClick={() => setUsCollapse(false)}
                className="hover:badge-ghost active:bg-primary px-4 py-2 rounded-lg"
              >
                <span>Students</span>
              </li>
            </CustomLink>

            {/* <CustomLink to='/memes'>
                            <li onClick={() => setUsCollapse(false)} className='hover:badge-ghost  active:bg-primary px-4 py-2 rounded-lg'>Memes</li>
                        </CustomLink> */}

            {/* <CustomLink to='/'>
                            <li onClick={() => setCollapse(false)} className='hover:badge-ghost  active:bg-primary px-4 py-2 rounded-lg'>Important Links</li>
                        </CustomLink>

                        <li onClick={() => setCollapse(false)} className='hover:badge-ghost  active:bg-primary px-4 py-2 rounded-lg whitespace-nowrap'>Assignment Covers</li> */}
          </ul>
        </div>

        <div className="relative">
          <input
            type="checkbox"
            onChange={(e) => setCollapse(e.target.checked)}
            checked={collapse}
            className="hidden"
          />

          <span
            onClick={() => setCollapse(!collapse)}
            onBlur={() => setCollapse(false)}
            className="hover:scale-105 font-bold text-sm md:text-xl my-auto mx-3 md:mx-5 flex items-center cursor-pointer group select-none whitespace-nowrap"
          >
            Information
            <FontAwesomeIcon
              icon={faAngleDown}
              className={`ml-2 group-hover:scale-105 transition-all ${
                collapse && "rotate-180"
              }`}
            />
          </span>

          <ul
            className={`absolute text-base bg-base-100 flex flex-col mt-4 rounded-xl h-auto cursor-pointer p-2 shadow-lg transform transition-all ${
              collapse || "invisible scale-0"
            }`}
          >
            <CustomLink to="/courses/current">
              <li
                onClick={() => setCollapse(false)}
                className="hover:badge-ghost active:bg-primary px-4 py-2 rounded-lg"
              >
                <span>Courses</span>
              </li>
            </CustomLink>

            <CustomLink to="/slides">
              <li
                onClick={() => setCollapse(false)}
                className="hover:badge-ghost  active:bg-primary px-4 py-2 rounded-lg"
              >
                Slides
              </li>
            </CustomLink>

            {/* <CustomLink to='/'>
                            <li onClick={() => setCollapse(false)} className='hover:badge-ghost  active:bg-primary px-4 py-2 rounded-lg'>Important Links</li>
                        </CustomLink>

                        <li onClick={() => setCollapse(false)} className='hover:badge-ghost  active:bg-primary px-4 py-2 rounded-lg whitespace-nowrap'>Assignment Covers</li> */}
          </ul>
        </div>

        <div className="dropdown dropdown-end flex items-center mx-3 md:mx-5">
          <label className="swap swap-rotate">
            <input
              className="checkbox hidden"
              onChange={(e) => checked(e.target.checked)}
              type="checkbox"
              checked={theme === "darkTheme" ? true : false}
            />

            <svg
              className="swap-on fill-current w-5 h-5 md:h-8 md:w-8"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>

            <svg
              className="swap-off fill-current w-5 h-5 md:h-8 md:w-8"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>
          </label>
        </div>
      </div>
      {loading || loadingData || adminLoading ? (
        <span className="animate-pulse btn-sm md:btn-md btn-circle bg-slate-700 "></span>
      ) : (
        <>
          {userData || user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 md:w-20 rounded-full">
                  <img src={userData?.photoURL || user?.photoURL} alt="" />
                </div>
              </label>
              <ul
                onClick={(e) => e.target.blur()}
                tabIndex="0"
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link to={`/userProfile/${user?.email}/self`}>Profile</Link>
                </li>
                <li>
                  {userData?.portfolio ? (
                    <Link to={`/userPortfolio/${userData?.email}/self`}>
                      Portfolio
                    </Link>
                  ) : (
                    <Link to="/editPortfolio">Create Portfolio</Link>
                  )}
                </li>
                <li>
                  <Link to="/settings">Settings</Link>
                </li>
                {isAdmin && (
                  <li>
                    <Link to="/manageData">
                      Manage Data
                      <span className="badge">Admin</span>
                    </Link>
                  </li>
                )}
                <li>
                  <span onClick={handleSignOut}>Logout</span>
                </li>
              </ul>
            </div>
          ) : (
            <div className="dropdown dropdown-end">
              <Link
                className="text-sm md:text-xl font-bold my-auto whitespace-nowrap"
                to="/login"
              >
                Sign In
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Header;
