import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import NLoading from '../../../../components/shared/Loading/NLoading';
import SlideView from './Containers/SlideView';
// import NoFile from '../../../../images/No_data_re_kwbl.png'

const Slides = () => {
	const { id: fileId, name: fileName } = useParams();

	const { isLoading, data: files } = useQuery(['courses'], () =>
		fetch(`https://section-n-server.vercel.app/getSlides/${fileId}`, {
			retry: false,
			cacheTime: 0,
		}).then((res) => res.json())
	);

	if (isLoading) return <NLoading />;

	return (
		<div className="py-24 overflow-hidden">
			<h2 className="text-center text-xl md:text-2xl font-bold poppins underline pb-10">{fileName.replaceAll('%20', ' ')}</h2>
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 justify-center ">
				{files?.map((file) => (
					<SlideView file={file} />
				))}
			</div>
			{/* <AddButton folderId={"courseId"} /> */}
		</div>
	);
};

export default Slides;
