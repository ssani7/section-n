import React from 'react';
import { useQuery } from 'react-query';
import NLoading from '../../../components/shared/Loading/NLoading';
import VerificationRow from './VerificationRow';

const VerificationReq = () => {
	const { isLoading, data: users, refetch } = useQuery('stars', () => fetch('https://section-n-server.vercel.app/user/verificationList').then((res) => res.json()));

	if (isLoading) return <NLoading />;

	if (users.length === 0) return <h2 className="w-full text-center text-3xl  font-semibold p-10">No Verification Request. Lazy day. Chill ;)</h2>;
	return (
		<div className="overflow-x-auto w-full">
			<table className="table w-full">
				<thead>
					<tr>
						<th className="text-center">Name</th>
						<th>Photo</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{users.map((user, i) => (
						<VerificationRow key={i} user={user} refetch={refetch} />
					))}
				</tbody>
				<tfoot>
					<tr>
						<th className="text-center">Name</th>
						<th>Photo</th>
						<th></th>
					</tr>
				</tfoot>
			</table>
		</div>
	);
};

export default VerificationReq;
