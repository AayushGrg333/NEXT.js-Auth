"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter,useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";


const VerifyEmailPage: React.FC = function () {
    const [token, setToken] = useState("");
    const [verified, setverified] = useState(false);
    const [error, setError] = useState(false);

    const router = useRouter();
    const searchParams = useSearchParams();

    const verifyUserEmail = async () => {
        try {
            await axios.post("api/users/verifyemail", { token });
            setverified(true);
            setError(false)
        } catch (error: any) {
            setError(true);
            console.log("error.response.data");
        }
    };

    useEffect(() => {
        setError(false)
        const urlToken = searchParams.get("token");
        if(urlToken){
            setToken(urlToken)
        }
    }, []);

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl">Verify Email</h1>
            <h2 className="p-2 bg-orange-500 text-black">
                {token ? `${token}` : "notoken"}
            </h2>
            {verified && (
                <div>
                    <h2>Verified</h2>
                    <Link href="/login">Login</Link>
                </div>
            )}
            {error && (
                <div>
                    <h2>Error verifying email</h2>
                </div>
            )}

        </div>
    );
};

export default VerifyEmailPage;
