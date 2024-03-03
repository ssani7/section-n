import React, { useEffect } from 'react';
import Banner from '../../components/UI/Banner';
import CountUpBanner from '../../components/UI/CountBanner';
import Footer from '../../components/shared/Footer/Footer';
import Stars from '../Info/Achievements/Stars';
import Events from '../Info/Events/Events';
import Routine from '../Info/Routine/Routine';
import RoutineGenerate from '../../components/UI/RoutineGenerate';

const Home = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<div className="bg-base-100 overflow-y-hidden">
			<Banner />

			<CountUpBanner />

			<Events />

			<Routine />

			<RoutineGenerate />

			<Stars />

			<Footer />
		</div>
	);
};

export default Home;
