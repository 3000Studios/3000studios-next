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
        <div class='min-h-screen bg-black text-white p-10'>
            <h1 class='text-5xl font-bold'>Shadow Command Center</h1>
            <form action={sendCommand} class='mt-6'>
                <input 
                    name='cmd'
                    class='w-full p-4 bg-gray-800 rounded border border-gray-700'
                    placeholder='Say or type a command...'
                />
            </form>
            <pre class='mt-8 bg-gray-900 p-6 rounded'>{output}</pre>
        </div>
    );
}
