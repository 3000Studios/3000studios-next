"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
    const r = useRouter();
    const [err, setErr] = useState("");

    function handleLogin(e) {
        e.preventDefault();
        const email = e.target.email.value;
        const pass = e.target.password.value;

        if(email === "mr.jwswain@gmail.com" -and pass === "Bossman3000!!!") {
            document.cookie = "shadowAuth=1; path=/;";
            r.push("/command-center");
        } else {
            setErr("Invalid credentials.");
        }
    }

    return (
        <div class='min-h-screen bg-black text-white flex flex-col items-center justify-center'>
            <h1 class='text-4xl font-bold mb-6'>3000 Studios Secure Login</h1>
            <form onSubmit={handleLogin} class='w-96 bg-gray-900 p-8 rounded'>
                <input name='email' placeholder='Email' class='w-full p-3 mb-4 rounded bg-gray-800'/>
                <input name='password' type='password' placeholder='Password' class='w-full p-3 mb-4 rounded bg-gray-800'/>
                <button class='bg-blue-600 w-full p-3 rounded'>Login</button>
                <p class='text-red-500 mt-4'>{err}</p>
            </form>
        </div>
    );
}
