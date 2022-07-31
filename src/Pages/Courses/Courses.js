import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { Link, Outlet } from 'react-router-dom';
import NLoading from '../Shared/NLoading';


const Courses = () => {
    const [checked, setChecked] = useState(true);
    const { isLoading, data: semesters } = useQuery('semesters', () => fetch("https://section-n-diu-server.herokuapp.com/courses").then(res => res.json()))

    // const [semester, setSemester] = useState(semesters?.length > 0 ? semesters[semesters.length - 1] : {});

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    if (isLoading) return <NLoading />

    return (
        <div className='pt-20'>
            <div className="drawer drawer-mobile">
                <input checked={checked} onChange={(e) => setChecked(e.target.checked)} id="course-drawer" type="checkbox" className="drawer-toggle"
                />
                <div className="drawer-content flex flex-col items-center bg-base-100">
                    <Outlet />

                </div>
                <div className="drawer-side border-r">
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
                <label htmlFor="course-drawer" className={`btn btn-accent btn-circle drawer-button lg:hidden absolute bottom-2 left-4 z-40 transform transition-all ${checked ? "rotate-180" : "rotate-0"}`}>❯</label>
            </div>
        </div>
    );
};

export default Courses;