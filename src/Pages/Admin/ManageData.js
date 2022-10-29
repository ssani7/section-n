import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Footer from '../Shared/Footer';

const ManageData = () => {
    const [checked, setChecked] = useState(true);

    return (
        <div className='pt-20'>
            <div className="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" checked={checked} onChange={e => setChecked(e.target.checked)} />
                <div className="drawer-content flex flex-col items-center lg:pt-10">
                    <Outlet />

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
                        <li onClick={() => setChecked(false)}><Link to='/manageData'>Add Achievement</Link></li>
                        <li onClick={() => setChecked(false)}><Link to='addEvent'>Add Event</Link></li>
                        <li onClick={() => setChecked(false)}><Link to='achvReq'>Achievement Requests</Link></li>
                        <li onClick={() => setChecked(false)}><Link to='verifyReq'>Verification Requests</Link></li>
                    </ul>
                </div>
                <label htmlFor="my-drawer-2" className={`btn btn-accent btn-circle drawer-button lg:hidden fixed bottom-10 left-4 z-40 transform transition-all ${checked ? "rotate-180" : "rotate-0"}`}>❯</label>
            </div>
            <Footer />
        </div>
    );
};

export default ManageData;