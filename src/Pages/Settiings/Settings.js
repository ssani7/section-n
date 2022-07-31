import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';


const Settings = () => {
    const [checked, setChecked] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <div className='pt-20'>
            <div className="drawer drawer-mobile">
                <input id="settings-drawer" checked={checked} onChange={(e) => setChecked(e.target.checked)} type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center bg-base-100">
                    <Outlet />

                </div>
                <div className="drawer-side border-r">
                    <label htmlFor="settings-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
                        <li onClick={() => setChecked(false)}><Link to='/settings'>Edit Your Profile</Link></li>
                        <li onClick={() => setChecked(false)}><Link to='verify'>Verify Account</Link></li>
                        <li onClick={() => setChecked(false)}><Link to='addAchvmnt'>Add Achievements</Link></li>
                    </ul>
                </div>
                <label htmlFor="settings-drawer" className={`btn btn-accent btn-circle drawer-button lg:hidden absolute bottom-2 left-4 z-40 transform transition-all ${checked ? "rotate-180" : "rotate-0"}`}>❯</label>
            </div>
        </div>
    );
};

export default Settings;