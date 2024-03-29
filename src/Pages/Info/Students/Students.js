import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import NLoading from '../../../components/shared/Loading/NLoading';

const Students = () => {
	const navigate = useNavigate();
	const { isLoading, data: students } = useQuery(['students'], () => fetch('https://section-n-server.vercel.app/user/students').then((res) => res.json()));

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	if (isLoading) return <NLoading />;

	return (
		<div className="overflow-x-auto pt-28 lg:px-16 w-full bg-base-100">
			<table className="table w-full">
				<thead>
					<tr>
						<th></th>
						<th>Name</th>
						<th>ID</th>
						<th>Email Address</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{students?.map((student, i) => (
						<tr key={i} className="hover cursor-pointer">
							<th>{i + 1}</th>
							<td>
								<div onClick={student.userData ? () => navigate(`/userProfile/${student.userData?.email}/others`) : undefined} className="flex items-center space-x-3">
									<div className="avatar">
										<div className="mask mask-squircle w-12 h-12">
											<img src={student?.userData?.photoURL || 'https://i.ibb.co/pzpVdPV/no-user-image-icon-3.jpg'} alt="Avatar Tailwind CSS Component" />
										</div>
									</div>
									<div>
										<div className="font-bold">{student.name}</div>
									</div>
									{student.userData && <FontAwesomeIcon icon={faCheckCircle} className="text-blue-600" />}
								</div>
							</td>
							<td>{student.id}</td>
							<td>{student.userData?.email}</td>
							<td>
								<div className="flex flex-col h-full w-full">
									{student.userData && (
										<button onClick={student.userData ? () => navigate(`/userProfile/${student.userData?.email}/others`) : undefined} className="btn btn-xs btn-outline capitalize">
											See Profile
										</button>
									)}

									{student.portfolio && (
										<button onClick={student.userData ? () => navigate(`/userPortfolio/${student.userData?.email}/other`) : undefined} className="btn btn-xs btn-outline btn-success capitalize mt-3">
											See Portfolio
										</button>
									)}
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Students;
