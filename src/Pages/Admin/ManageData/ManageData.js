import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const ManageData = () => {
    return (
        <div className='pt-20'>
            <div className="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center lg:pt-10">
                    <Outlet />
                    <label htmlFor="my-drawer-2" className="btn btn-accent rounded-full drawer-button lg:hidden absolute bottom-2 left-4">&gt;</label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
                        <li><Link to='/manageData'>Add Achievement</Link></li>
                        <li><Link to='addEvent'>Add Event</Link></li>
                        <li><Link to='achvReq'>Achievement Requests</Link></li>
                        <li><Link to='verifyReq'>Verification Requests</Link></li>
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default ManageData;