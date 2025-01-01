"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface User {
    _id: string;
    username: string;
    email: string;
}

const ExampleComponent = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("/api/users");
                console.log(response.data);
                setUsers(response.data.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);
    console.log(users);

    return (
        <div>
            <h1>Users</h1>
            <ul>
                {users && users.map((item) => (
                    <li key={item._id}>
                        {item.username} - {item.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExampleComponent;
