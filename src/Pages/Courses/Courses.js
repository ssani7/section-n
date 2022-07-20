import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { Link, Outlet } from 'react-router-dom';
import NLoading from '../Shared/NLoading';


const Courses = () => {
    const [checked, setChecked] = useState(false);
    const { isLoading, data: semesters } = useQuery('semesters', () => fetch("https://section-n-diu-server.herokuapp.com/courses").then(res => res.json()))

    // const [semester, setSemester] = useState(semesters?.length > 0 ? semesters[semesters.length - 1] : {});

    if (isLoading) return <NLoading />

    return (
        <div className='pt-20'>
            <div className="drawer drawer-mobile">
                <input checked={checked} id="my-drawer-2" type="checkbox" className="drawer-toggle"
                    onChange={(e) => setChecked(e.target.checked)} />
                <div className="drawer-content flex flex-col items-center bg-base-100">
                    <Outlet />
                    <label htmlFor="my-drawer-2" className="btn btn-accent rounded-full drawer-button lg:hidden absolute bottom-2 left-4">&gt;</label>
                </div>
                <div className="drawer-side border-r">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
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
        </div>
    );
};

export default Courses;