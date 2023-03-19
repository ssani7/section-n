import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import NLoading from '../../../Shared/Loading/NLoading';
import AddButton from './Containers/AddButton';
import FileView from './Containers/FileView';

const CourseView = () => {
	const { id: courseId, name: courseName } = useParams();
	const [courses, setCourses] = useState([]);
	const [isLoading, setLoading] = useState(false);

	// const { isLoading, data: courses } = useQuery(["courses"], () => fetch(`http://localhost:5000/getCourses/${courseId}`, {
	//     retry: false,
	//     cacheTime: 0
	// }).then(res => res.json()));

	useEffect(() => {
		setLoading(true);
		axios.get(`http://localhost:5000/getCourses/${courseId}`).then((res) => {
			setCourses(res.data);
			setLoading(false);
		});
	}, [courseId]);

	if (isLoading) return <NLoading />;

	return (
		<div className="pt-20">
			<h2 className="text-center text-xl md:text-2xl font-bold poppins underline pb-10">{courseName}</h2>
			<div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-5 md:gap-10 px-5 overflow-hidden">
				{courses?.map((semester, i) => (
					<FileView data={semester} link={'/slides/courses/'} />
				))}

				<AddButton folderId={courseId} />
			</div>
		</div>
	);
};

export default CourseView;
