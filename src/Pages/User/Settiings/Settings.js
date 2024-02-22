import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Footer from '../../../components/shared/Footer/Footer';
import NLoading from '../../../components/shared/Loading/NLoading';
import useDBUser from '../../../hooks/useDBUser';

const Settings = () => {
	const [checked, setChecked] = useState(false);
	const [userData, loading] = useDBUser();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	if (loading) return <NLoading />;

	return (
		<div className="pt-20 h-full min-h-screen relative">
			<div className="drawer relative drawer-mobile h-full">
				<input id="settings-drawer" checked={checked} onChange={(e) => setChecked(e.target.checked)} type="checkbox" className="drawer-toggle" />
				<div className="drawer-content flex flex-col items-center bg-base-100 min-h-screen">
					<Outlet />
				</div>
				<div className="drawer-side border-r">
					<label htmlFor="settings-drawer" className="drawer-overlay"></label>
					<ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
						<li onClick={() => setChecked(false)}>
							<Link to="/settings">Edit Your Profile</Link>
						</li>
						<li onClick={() => setChecked(false)}>
							<Link to="verify">Verify Account</Link>
						</li>
						<li onClick={() => setChecked(false)}>
							<Link to="/editPortfolio">{`${userData?.portfolio ? 'Edit ' : 'Create '}`} Your Portfilio</Link>
						</li>
						<li onClick={() => setChecked(false)}>
							<Link to="addAchvmnt">Add Achievements</Link>
						</li>
					</ul>
				</div>

				<label htmlFor="settings-drawer" className={`btn btn-primary btn-circle drawer-button lg:hidden fixed bottom-10 left-4 z-40 transform transition-all ${checked ? 'rotate-180' : 'rotate-0'}`}>
					❯
				</label>
				<div className="h-screen absolute"></div>
			</div>

			<Footer />
		</div>
	);
};

export default Settings;
