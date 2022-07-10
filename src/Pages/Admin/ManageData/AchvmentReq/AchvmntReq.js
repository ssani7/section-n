import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../../../Shared/Loading';
import AchvmntReqRow from './AchvmntReqRow';

const AchvmntReq = () => {
    const { isLoading, data: requests, refetch } = useQuery('stars', () => fetch('https://section-n-diu-server.herokuapp.com/achievementsReq').then(res => res.json()));


    if (isLoading) return <Loading />
    if (requests.length === 0) return <h2 className='w-full text-center text-3xl  font-semibold p-10'>No requests. Lazy day. Chill ;)</h2>
    return (
        <div className="overflow-x-auto w-full">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th className='text-center'>Name</th>
                        <th>Achievement</th>
                        <th>Photo</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        requests.map((request, i) => <AchvmntReqRow
                            key={i}
                            request={request}
                            refetch={refetch}
                        />)
                    }

                </tbody>
                <tfoot>
                    <tr>
                        <th className='text-center'>Name</th>
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