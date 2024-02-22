import React from 'react';
import { useQuery } from 'react-query';
import NLoading from '../../../components/shared/Loading/NLoading';
import AchvmntReqRow from './AchvmntReqRow';

const AchvmntReq = () => {
	const { isLoading, data: requests, refetch } = useQuery('stars', () => fetch('https://section-n-server.vercel.app/achievements/requests').then((res) => res.json()));

	if (isLoading) return <NLoading />;

	if (requests.length === 0) return <h2 className="w-full text-center text-3xl  font-semibold p-10">No Achievement Request. Lazy day. Chill ;)</h2>;
	return (
		<div className="overflow-x-auto w-full">
			<table className="table w-full">
				<thead>
					<tr>
						<th></th>
						<th className="text-center">Name</th>
						<th>Achievement</th>
						<th>Photo</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{requests.map((request, i) => (
						<AchvmntReqRow key={i} index={i} request={request} refetch={refetch} />
					))}
				</tbody>
				<tfoot>
					<tr>
						<th></th>
						<th className="text-center">Name</th>
						<th>Job</th>
						<th>Favorite Color</th>
						<th></th>
					</tr>
				</tfoot>
			</table>
		</div>
	);
};

export default AchvmntReq;
