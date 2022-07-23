import React from 'react';
import { useEffect } from 'react';

const ContactCR = () => {
    const crs = [
        {
            name: "Md. Sakib Hasan Antu",
            hsc: "Dhaka College",
            address: "Mirpur, Dhaka",
            phone: "+8801852851642",
            image: "https://i.ibb.co/F85LpQL/inbound4197563016626262552.jpg"
        },
        {
            name: "Israt Jahan Shifa",
            hsc: "New Govt. Degree College, Rajshahi",
            address: "DSC Hall, Ashulia",
            phone: "+8801774476304",
            image: "https://i.ibb.co/KwCMvz8/shifa-star.jpg"
        }
    ];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
        <div className='pt-20 min-h-screen flex flex-col justify-center items-center bg-base-100'>
            {
                crs.map((cr, i) => (
                    <div class={`hero-content justify-evenly flex-col ${(i % 2 === 0) ? 'lg:flex-row' : 'lg:flex-row-reverse'} bg-base-200 mt-6 p-12 rounded-xl w-5/6`}>
                        <img src={cr.image} class="h-64 w-56 md:w-80 md:h-96 rounded-lg shadow-2xl object-cover" alt='' />
                        <div className={`text-center ${(i % 2 === 0) ? 'md:text-left' : 'md:text-right'} `}>
                            <h1 class="text-2xl md:text-5xl font-bold mb-2">{cr.name}</h1>
                            <p class="text-lg pt-2">Lives in : {cr.address}</p>
                            <p class="text-lg pt-2">College : {cr.hsc}</p>
                            <p class="text-lg pt-2">Phone : {cr.phone}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default ContactCR;