import React from 'react';

const Dummy = () => {
    const data = { name: "sani" };
    fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(data)
    })
    return (
        <div>

        </div>
    );
};

export default Dummy;