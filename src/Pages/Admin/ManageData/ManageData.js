import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const ManageData = () => {
    return (
        <div className='pt-20'>
            <div class="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
                <div class="drawer-content flex flex-col items-center lg:pt-10">
                    <Outlet />
                    <label for="my-drawer-2" class="btn btn-accent rounded-full drawer-button lg:hidden absolute bottom-2 left-4">&gt;</label>
                </div>
                <div class="drawer-side">
                    <label for="my-drawer-2" class="drawer-overlay"></label>
                    <ul class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
                        <li><Link to=''>Add Achievement</Link></li>
                        <li><Link to='achvReq'>Achievement Requests</Link></li>
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default ManageData;