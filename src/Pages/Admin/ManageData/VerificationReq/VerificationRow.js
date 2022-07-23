import axios from 'axios';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';

const VerificationRow = ({ user, refetch }) => {
    const [removing, setRemoving] = useState(false);
    const [accepting, setAccepting] = useState(false);

    const removeReq = () => {
        setRemoving(true);
        axios.put(`https://section-n-diu-server.herokuapp.com/achievements/${user._id}`)
            .then(res => {
                if (res.data.deletedCount > 0) {
                    setRemoving(false);
                    toast.success("Removed user Succefully")
                    refetch();
                }
            })
    }

    const acceptReq = () => {
        setAccepting(true);
        axios.put(`https://section-n-diu-server.herokuapp.com/verification/approve/${user._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    setAccepting(false);
                    toast.success("Achivement is one of ours. Uraa!!!")
                    refetch();
                }
            })
    }
    return (
        <tr>
            <td>
                <div className="flex items-center space-x-3 text-center mx-auto w-fit">
                    <div>
                        <div className="font-bold">{user?.displayName}</div>
                        <div className="text-sm opacity-50">{user?.id}</div>
                    </div>
                </div>
            </td>
            <td>
                <div className="avatar">
                    <div className="mask mask-square w-28 h-28">
                        <img src={user?.photoURL} alt="sender pic" />
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

export default VerificationRow;