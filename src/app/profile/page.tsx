"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Profile: React.FC = function () {
    const router = useRouter()
    const [userId, setuserId] = useState<string | null>(null);
    const [error, seterror] = useState<boolean>(false);

    const logout = async () => {
        try {
            await axios({
                method: "get",
                url: '/api/users/logout'
            });
            router.push("/login");
        } catch (error: any) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        (async () => {
            try {
                const response = await axios({
                    method: "get",
                    url: "/api/users/profile",
                });
                setuserId(response.data.data._id);
            } catch (error) {
                seterror(true);
            }
        })();
    }, []);

    return (
        <div className="h-screen w-screen flex justify-center space-y-2 flex-col items-center">
            <div>
                <Link href={`/profile/${userId}`}>
                    <p>{userId}</p>
                    <p>click the link</p>
                </Link>
            </div>
            {error && (
                <div>
                    <p>Cannot get Token</p>
                </div>
            )}
            <button
                className="bg-blue-600 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-sm"
                onClick={logout}
            >
                LogOut
            </button>
        </div>
    );
};

export default Profile;
