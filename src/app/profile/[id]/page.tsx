"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

interface User {
    email: string;
    isVerified: boolean;
    updatedAt: Date;
    username: string;
    verificationToken: null;
    verificationTokenExpiry: null;
    _id: string;
}

const Profile: React.FC = function () {
    const [user, setuser] = useState<User | null>(null);
    const [error, seterror] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            try {
                const response = await axios({
                    method: "get",
                    url: "/api/users/profile",
                });
                setuser(response.data.data as User);
            } catch (error) {
                seterror(true);
                console.error("Error while retrieving");
            }
        })();
    }, []);

    return (
        <div className="h-screen w-screen flex justify-center space-y-2 flex-col items-center">
            <div>
            <h1>Profile:</h1>
            <p>Username: {user?.username}</p>
            <p>Email: {user?.email}</p>
            <p>Verified: {user?.isVerified ? "Yes" : "No"}</p>
            <p>Last Updated: {user?.updatedAt.toString()}</p>
            </div>
            {error && (
                <div>
                    <p>Cannot get Token</p>
                </div>
            )}
        </div>
    );
};

export default Profile;
