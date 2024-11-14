"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignupPage: React.FC = function () {
    const router = useRouter();
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);

            const response = await axios({
                method: "post",
                url: "/api/users/signup",
                data: user,
            });
            console.log("signup success", response.data);
            router.push("/login");
        } catch (error: any) {
            console.log("signup failed");
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (
            user.email.length > 0 &&
            user.password.length > 0 &&
            user.username.length > 0
        ) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="flex flex-col min-h-screen w-100% justify-center space-y-2 items-center py-2">
            <h1>{loading ? "processing" : "Signup"}</h1>

            <label className="input input-bordered flex items-center gap-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70"
                >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>

                <input
                    type="text"
                    className="grow text-black rounded-sm placeholder:text-black"
                    placeholder="Username"
                    value={user.username}
                    onChange={(e) =>
                        setUser({ ...user, username: e.target.value })
                    }
                />
            </label>

            <label className="input input-bordered flex items-center gap-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70"
                >
                    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>

                <input
                    type="text"
                    className="grow  text-black rounded-sm placeholder:text-black"
                    placeholder="Email"
                    value={user.email}
                    onChange={(event) =>
                        setUser({ ...user, email: event.target.value })
                    }
                />
            </label>

            <label className="input input-bordered flex items-center gap-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70"
                >
                    <path
                        fillRule="evenodd"
                        d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                        clipRule="evenodd"
                    />
                </svg>

                <input
                    type="password"
                    className="grow  text-black rounded-sm placeholder:text-black"
                    placeholder="password"
                    value={user.password}
                    onChange={(event) =>
                        setUser({ ...user, password: event.target.value })
                    }
                />
            </label>

            <button onClick={onSignup} disabled={loading || buttonDisabled} className="btn btn-active rounded-sm bg-slate-900  px-5 hover:bg-slate-500">
                {buttonDisabled ? "No signup" : loading ? "processing" : "signup"}
            </button>

            <div className="flex flex-col items-center text-[10px]">
                <p>Already have an account?</p>
                <Link className="text-blue-500 hover:text-blue-400" href="/login">Login page</Link>
            </div>
        </div>
    );
};

export default SignupPage;