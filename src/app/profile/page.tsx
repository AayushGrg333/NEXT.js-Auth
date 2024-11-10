'use client';
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const ProfilePage: React.FC = function () {
    const router = useRouter();
    const [data, setData] = useState<string | null>(null);  // Make data type explicit

    // Function to fetch user details
    const getUserDetails = async () => {
        try {
            const response = await axios({
                method: "post",
                url: "/api/users/me",
            });
            if(!response){
                console.log("i haven't got the data")
            }
            setData(response.data.data._id);  // Assuming this returns the user ID
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
        }
    };
    // Function to handle logout
    const logout = async () => {
        try {
            await axios({
                method: "get",
                url: '/api/users/logout'
            });
            toast.success("Logout successful");
            router.push("/login");
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
<h2>Profile Page</h2>
            <hr />
            {data ? (
                <Link href={`/profile/${data}`}>
                    <p className="text-blue-500 underline mt-4">{data}</p>
                </Link>
            ) : (
                <p>No user data found</p>
            )}
            <button
                className="bg-blue-600 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-sm"
                onClick={logout}
            >
                LogOut
            </button>
            <button
                className="bg-green-600 mt-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-sm"
                onClick={getUserDetails}
            >
                Get User Details
            </button>
        </div>
    );
};

export default ProfilePage;
