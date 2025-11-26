"use client";
import React, { useState } from 'react';

export default function CommandCenter() {
    const [output, setOutput] = useState("");

    async function sendCommand(formData) {
        const cmd = formData.get("cmd");
        const res = await fetch("/api/shadow", {
            method: "POST",
            body: JSON.stringify({ command: cmd })
        });
        const data = await res.json();
        setOutput(data.output);
    }

    return (
        <div className='min-h-screen bg-black text-white p-10'>
            <h1 className='text-5xl font-bold'>Shadow Command Center</h1>
            <form action={sendCommand} className='mt-6'>
                <input
                    name='cmd'
                    className='w-full p-4 bg-gray-800 rounded border border-gray-700'
                    placeholder='Say or type a command...'
                />
            </form>
            <pre className='mt-8 bg-gray-900 p-6 rounded'>{output}</pre>
        </div>
    );
}
