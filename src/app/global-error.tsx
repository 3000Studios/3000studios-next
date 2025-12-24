<<<<<<< HEAD
"use client";
=======
'use client';
>>>>>>> origin/copilot/update-main-with-all-branches

/**
 * Global Error Handler (Root Level)
 * Handles errors that occur in the root layout
 */

<<<<<<< HEAD
import { useEffect } from "react";
=======
import { useEffect } from 'react';
>>>>>>> origin/copilot/update-main-with-all-branches

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
<<<<<<< HEAD
    console.error("Global error:", error);
=======
    console.error('Global error:', error);
>>>>>>> origin/copilot/update-main-with-all-branches
  }, [error]);

  return (
    <html>
      <body>
<<<<<<< HEAD
        <div
          style={{
            minHeight: "100vh",
            background: "#000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          <div style={{ textAlign: "center", maxWidth: "600px" }}>
            <h1
              style={{
                fontSize: "3rem",
                fontWeight: "bold",
                background:
                  "linear-gradient(to right, #FFD700, #E5E4E2, #0F52BA)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: "1rem",
              }}
            >
              Critical Error
            </h1>
            <p style={{ color: "#9ca3af", marginBottom: "2rem" }}>
=======
        <div style={{
          minHeight: '100vh',
          background: '#000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
        }}>
          <div style={{ textAlign: 'center', maxWidth: '600px' }}>
            <h1 style={{
              fontSize: '3rem',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #FFD700, #E5E4E2, #0F52BA)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1rem',
            }}>
              Critical Error
            </h1>
            <p style={{ color: '#9ca3af', marginBottom: '2rem' }}>
>>>>>>> origin/copilot/update-main-with-all-branches
              A critical error occurred. Please refresh the page.
            </p>
            <button
              onClick={reset}
              style={{
<<<<<<< HEAD
                padding: "0.75rem 1.5rem",
                background: "linear-gradient(to right, #FFD700, #0F52BA)",
                color: "#000",
                fontWeight: "600",
                borderRadius: "0.5rem",
                border: "none",
                cursor: "pointer",
=======
                padding: '0.75rem 1.5rem',
                background: 'linear-gradient(to right, #FFD700, #0F52BA)',
                color: '#000',
                fontWeight: '600',
                borderRadius: '0.5rem',
                border: 'none',
                cursor: 'pointer',
>>>>>>> origin/copilot/update-main-with-all-branches
              }}
            >
              Refresh Page
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
