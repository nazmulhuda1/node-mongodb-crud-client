import React, { useState } from 'react';

const AddUser = () => {
    const [user, setUser] = useState({ name: 'default', email: 'de@gmail.com' })
    const handleAddUser = (event) => {
        event.preventDefault();
        console.log(user);

        // client side theke server side a patano hoyece
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    alert('user added successfully');
                    event.target.reset();
                }
            })
    }

    const handleInputBlure = (event) => {
        const value = event.target.value;
        const field = event.target.name;
        const newUser = { ...user }
        newUser[field] = value;
        setUser(newUser);
    }

    return (
        <div>
            <h2>Create New User Account</h2>
            <form onSubmit={handleAddUser}>
                <input onBlur={handleInputBlure} type="text" name='name' placeholder='Name' />
                <br />
                <input onBlur={handleInputBlure} type="email" name="email" id="" placeholder='Enter Your Email' />
                <br />
                <button type="submit">Create User</button>
            </form>
        </div>
    );
};

export default AddUser;