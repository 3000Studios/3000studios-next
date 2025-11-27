// Copyright (c) 2025 NAME.
// All rights reserved.
// Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.

"use client";

import { useState } from "react";

export default function ShadowLogin() {
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [error, setError] = useState("");

    const handleLogin = (e: any) => {
        e.preventDefault();

        if (user === process.env.NEXT_PUBLIC_SHADOW_USER &&
            pass === process.env.SHADOW_PASSWORD) {

            window.location.href = "/shadow";
        } else {
            setError("Invalid login. Access denied.");
        }
    };

    return (
        <div style={{
            background: "#000",
            color: "#0ff",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "Arial"
        }}>
            <h1 style={{ fontSize: "3rem", marginBottom: "20px" }}>
                SHADOW ACCESS TERMINAL
            </h1>

            <form onSubmit={handleLogin}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "300px",
                    gap: "10px"
                }}
            >
                <input
                    placeholder="Username"
                    value={user}
                    onChange={e => setUser(e.target.value)}
                    style={{ padding: "10px", fontSize: "1.2rem" }}
                />

                <input
                    placeholder="Password"
                    type="password"
                    value={pass}
                    onChange={e => setPass(e.target.value)}
                    style={{ padding: "10px", fontSize: "1.2rem" }}
                />

                <button
                    type="submit"
                    style={{
                        padding: "10px",
                        fontSize: "1.2rem",
                        background: "#0ff",
                        border: "none",
                        cursor: "pointer"
                    }}
                >
                    LOGIN
                </button>
            </form>

            {error && (
                <p style={{ color: "red", marginTop: "20px" }}>{error}</p>
            )}
        </div>
    );
}
