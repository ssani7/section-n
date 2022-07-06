import React from 'react';

const Dummy = () => {
    const data = { name: "sani" };
    fetch("https://section-n-diu-server.herokuapp.com/users", {
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