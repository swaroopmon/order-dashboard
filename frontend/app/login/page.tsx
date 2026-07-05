"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function LoginPage() {

    const router = useRouter();

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);

    async function login(e: React.FormEvent) {

        e.preventDefault();

        setLoading(true);

        setError("");

        try {

            const formData = new URLSearchParams();

            formData.append("username", username);

            formData.append("password", password);

            const response = await api.post(
                "/login",
                formData,
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );

            localStorage.setItem(
                "token",
                response.data.access_token
            );

            router.push("/dashboard");

        } catch (err) {

            setError("Invalid username or password.");

        } finally {

            setLoading(false);

        }

    }

    return (

        <div className="min-h-screen bg-slate-100 flex items-center justify-center">

            <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-8">

                <h1 className="text-3xl font-bold text-center mb-2">
                    Order Dashboard
                </h1>

                <p className="text-center text-gray-500 mb-8">
                    Login to continue
                </p>

                <form
                    onSubmit={login}
                    className="space-y-5"
                >

                    <div>

                        <label className="block mb-2 font-medium">
                            Username
                        </label>

                        <input
                            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={username}
                            onChange={(e) =>
                                setUsername(e.target.value)
                            }
                            required
                        />

                    </div>

                    <div>

                        <label className="block mb-2 font-medium">
                            Password
                        </label>

                        <input
                            type="password"
                            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            required
                        />

                    </div>

                    {error && (

                        <div className="text-red-600 text-sm">
                            {error}
                        </div>

                    )}

                    <button
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 font-semibold transition"
                    >

                        {loading ? "Signing In..." : "Login"}

                    </button>

                </form>

            </div>

        </div>

    );

}