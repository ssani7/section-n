import React from 'react';
import { Link, Outlet } from 'react-router-dom';


const Settings = () => {
    return (
        <div className='pt-20'>
            <div className="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center bg-base-100">
                    <Outlet />
                    <label htmlFor="my-drawer-2" className="btn btn-accent rounded-full drawer-button lg:hidden absolute bottom-2 left-4">&gt;</label>
                </div>
                <div className="drawer-side border-r">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
                        <li><Link to='/settings'>Edit Your Profile</Link></li>
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default Settings;