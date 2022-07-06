import React from 'react';

const AchvmntReqRow = ({ request }) => {
    return (
        <tr>
            <td>
                <div class="flex items-center space-x-3 text-center mx-auto w-fit">
                    <div class="avatar">
                        <div class="mask mask-squircle w-12 h-12">
                            <img src={request.senderDp} alt="sender pic" />
                        </div>
                    </div>
                    <div>
                        <div class="font-bold">{request.sender}</div>
                        <div class="text-sm opacity-50">{request.id}</div>
                    </div>
                </div>
            </td>
            <td>
                {request.achievement}
                <br />
                <span class="text-sm opacity-50">{request.name}</span>
            </td>
            <td>
                <div class="avatar">
                    <div class="mask mask-square w-28 h-28">
                        <img src={request.image} alt="Avatar Tailwind CSS Component" />
                    </div>
                </div>
            </td>
            <th>
                <div className='w-24 flex flex-col lg:flex-row'>
                    <button class="btn btn-success btn-xs mb-2 lg:mr-4">Approve</button>
                    <button class="btn btn-error btn-xs">Remove</button>
                </div>
            </th>
        </tr>
    );
};

export default AchvmntReqRow;