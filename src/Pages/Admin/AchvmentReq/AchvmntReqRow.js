import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';

const AchvmntReqRow = ({ request, refetch, index }) => {
    const [removing, setRemoving] = useState(false);
    const [accepting, setAccepting] = useState(false);

    const removeReq = () => {
        setRemoving(true);
        axios.delete(`https://section-n-server.vercel.app/achievements/${request._id}`)
            .then(res => {
                if (res.data.deletedCount >= 1) {
                    setRemoving(false);
                    toast.success("Removed Request Succefully");
                    refetch();
                }
            })
    }

    const acceptReq = () => {
        setAccepting(true);
        axios.put(`https://section-n-server.vercel.app/achievements/${request._id}`)
            .then(res => {
                if (res) {
                    setAccepting(false);
                    toast.success("Achivement is one of ours. Uraa!!!")
                    refetch();
                }
            })
    }

    return (
        <tr>
            <th>
                {
                    index + 1
                }
            </th>
            <td>
                <div className="flex items-center space-x-3 text-center mx-auto w-fit">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={request.senderDp} alt="sender pic" />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{request.sender}</div>
                        <div className="text-sm opacity-50">{request.id}</div>
                    </div>
                </div>
            </td>
            <td>
                {request.achievement}
                <br />
                <span className="text-sm opacity-50">{request.name}</span>
            </td>
            <td>
                <div className="avatar">
                    <div className="mask mask-square w-28 h-28">
                        <img src={request.image} alt="Avatar Tailwind CSS Component" />
                    </div>
                </div>
            </td>
            <th>
                <div className='w-24 flex flex-col lg:flex-row'>
                    {
                        accepting
                            ? <button className="btn btn-primary btn-xs loading normal-case">Accepting</button>
                            : <button onClick={() => acceptReq()} className="btn btn-success btn-xs mb-2 lg:mr-4">Approve</button>
                    }
                    {
                        removing
                            ? <button className="btn btn-primary btn-xs loading normal-case">Removing</button>
                            : <button onClick={() => removeReq()} className="btn btn-error btn-xs">Remove</button>
                    }
                </div>
            </th>
        </tr>
    );
};

export default AchvmntReqRow;