import React from 'react';
import { useQuery } from 'react-query';
import NLoading from '../../../Shared/Loading/NLoading';
import EmptyPic from '../../../../images/2953962.png';
import FileView from './Containers/FileView';
import AddButton from './Containers/AddButton';

const Slides = () => {
	const { isLoading, data } = useQuery(['semesters'], () =>
		fetch('http://localhost:5000/getSemesters', {
			retry: false,
			cacheTime: 0,
		}).then((res) => res.json())
	);

	if (isLoading) return <NLoading />;

	if (data?.semesters?.length === 0)
		return (
			<div className="w-full flex flex-col items-center justify-center">
				<img className="w-96 h-96 mt-20" src={EmptyPic} alt="" />
				<h2 className="text-center text-xl">Nothing Uploaded Here</h2>
			</div>
		);

	return (
		<div className="pt-20 relative h-screen">
			<h2 className="text-center text-xl md:text-2xl font-bold poppins underline pb-10">All Semesters</h2>
			<div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-10 overflow-hidden justify-center">
				{data?.semesters?.map((semester, i) => (
					<FileView key={i} data={semester} link={'/slides/semester/'} />
				))}
			</div>

			<AddButton folderId={data.folderId} />
		</div>
	);
};

export default Slides;
