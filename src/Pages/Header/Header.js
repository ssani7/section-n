import React, { useState } from 'react';

const Header = () => {
    const [dropdown, setDropdown] = useState(false);
    console.log(dropdown)

    const navItems = <>
        <li><a>Item 1</a></li>
        <li><a>Item 3</a></li>
    </>

    return (
        <div className="navbar bg-base-100 absolute z-50 bg-transparent text-white">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex="0" className="lg:hidden mr-auto">
                        <label className="btn btn-circle btn-ghost swap swap-rotate">

                            {/* <!-- this hidden checkbox controls the state --> */}
                            <input onChange={() => setDropdown(!dropdown)} id='check' type="checkbox" />

                            {/* <!-- hamburger icon --> */}
                            <svg className="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" /></svg>

                            {/* <!-- close icon --> */}
                            <svg className="swap-on fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" /></svg>
                        </label>
                    </label>
                    <ul tabIndex="0" className={`menu menu-compact lg:hidden ${dropdown ? '' : 'hidden'} mt-3 p-2 shadow bg-base-100 rounded-box absolute w-96 items-center`}>
                        {navItems}
                    </ul>
                </div>
                <a className="btn btn-ghost normal-case text-xl">Section N</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {navItems}
                </ul>
            </div>
            <div className="navbar-end">
            </div>
        </div>
    );
};

export default Header;