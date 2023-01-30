import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

const Update = () => {
    const storeUser = useLoaderData()
    const [user, setUser] = useState(storeUser)

    const handleUpdateUser = (event) => {
        event.preventDefault();
        fetch(`http://localhost:5000/users/${storeUser._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    alert('user updated')
                }
            })
    }

    const handleInputChange = (event) => {
        const value = event.target.value;
        const field = event.target.name;
        const newUser = { ...user }
        newUser[field] = value;
        setUser(newUser);
    }

    return (
        <div>
            <h1>Please Update : {storeUser.name}</h1>
            <form onSubmit={handleUpdateUser}>
                <input onChange={handleInputChange} defaultValue={storeUser.name} type="text" name='name' placeholder='Name' />
                <br />
                <input onChange={handleInputChange} defaultValue={storeUser.email} type="email" name="email" id="" placeholder='Enter Your Email' />
                <br />
                <button type="submit">Update User</button>
            </form>
        </div>
    );
};

export default Update;