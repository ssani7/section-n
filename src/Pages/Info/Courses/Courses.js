import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { Link, Outlet } from 'react-router-dom';
import Footer from '../../Shared/Footer/Footer';
import NLoading from '../../Shared/Loading/NLoading';


const Courses = () => {
    const [checked, setChecked] = useState(false);
    const { isLoading, data: semesters } = useQuery('semesters', () => fetch("https://section-n-server.vercel.app/courses").then(res => res.json()))

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    if (isLoading) return <NLoading />

    return (
        <div className='pt-20 min-h-screen'>
            <div className="drawer drawer-mobile h-full relative">
                <input checked={checked} onChange={(e) => setChecked(e.target.checked)} id="course-drawer" type="checkbox" className="drawer-toggle"
                />
                <div className="drawer-content flex flex-col items-center bg-base-100 px-2 ">
                    <Outlet />

                </div>
                <div className="drawer-side border-r border-primary h-full">
                    <label htmlFor="course-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
                        {
                            semesters?.map((semester, i) => (
                                <li
                                    key={i}
                                    onClick={() => setChecked(false)}
                                >
                                    <Link to={`/courses/${semester.semester}`} >{semester.semester}</Link>
                                </li>))
                        }
                    </ul>
                </div>
            </div>
            <label htmlFor="course-drawer" className={`btn btn-primary btn-circle drawer-button lg:hidden fixed bottom-10 left-4 z-40 transform transition-all ${checked ? "rotate-180" : "rotate-0"}`}>❯</label>
            <Footer />
        </div>
    );
};

export default Courses;