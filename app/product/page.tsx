"use client";
import React from 'react'
import { useState } from 'react';

interface User {
    username: string;
    password: string;
}

const Product = () => {
    const [ users , setUsers ] = useState<User[]>([]);
    const userData = async () => {
        try {
            const response = await fetch('/api/users', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const result = await response.json();
            if (response.ok) {
                console.log(result.data);
                setUsers(result.data);
            }
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <>
            <div>Product</div>
            <button onClick={userData}>ok</button>
            {users.length > 0 && users.map((item, index) => (
                <div key={index}>
                    <p>{item?.username}</p>
                    <p>{item?.password}</p>
                </div>
            ))}

        </>
    )
}

export default Product