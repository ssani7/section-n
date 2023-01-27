import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import NLoading from '../../Shared/Loading/NLoading';

const Project = () => {
    const { email, index } = useParams();

    const { isLoading, data } = useQuery(['project', [email, index]], () => fetch(`https://section-n-server.vercel.app/user/${email}`).then(res => res.json()))

    if (isLoading) return <NLoading />

    // const {proje}
    const project = data?.portfolio?.projects[index];

    return (
        <div className='bg-base-100 pt-20'>
            <div className='flex w-2/5 h-full flex-wrap mx-auto'>
                <img src={project?.image} alt="" className='h-64 w-1/2 p-2 mx-auto object-cover' />
                <img src={project?.image} alt="" className='h-64 w-1/2 p-2 mx-auto object-cover' />
                <img src={project?.image} alt="" className='h-64 w-1/2 p-2 mx-auto object-cover' />
            </div>
        </div>
    );
};

export default Project;