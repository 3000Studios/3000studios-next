// app/page.tsx  
"use client";

import React from "react";

export default function HomePage() {
  return (
    <main style={styles.main}>
      <section style={styles.hero}>
        <h1 style={styles.title}>Welcome to 3000 Studios</h1>
        <p style={styles.subtitle}>Elite AI-powered web experiences. Built for bosses.</p>
      </section>
      <section style={styles.content}>
        <h2 style={styles.heading}>What We Do</h2>
        <ul style={styles.list}>
          <li>Autonomous DevOps & Deployment</li>
          <li>State-of-the-art UI/UX</li>
          <li>Monetization Modules (PayPal, Subscriptions, Affiliate)</li>
          <li>Enterprise-grade Security & Stability</li>
        </ul>
      </section>
    </main>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  main: {
    margin: 0,
    padding: 0,
    fontFamily: "system-ui, sans-serif",
    lineHeight: 1.5,
    backgroundColor: "#0a0a0a",
    color: "#f0f0f0",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  hero: {
    width: "100%",
    padding: "4rem 1rem",
    textAlign: "center" as const,
    background: "linear-gradient(135deg, #1f1f1f, #121212)",
  },
  title: {
    fontSize: "3rem",
    margin: 0,
  },
  subtitle: {
    fontSize: "1.5rem",
    marginTop: "1rem",
    color: "#ddd",
  },
  content: {
    width: "100%",
    maxWidth: "800px",
    padding: "2rem 1rem",
  },
  heading: {
    fontSize: "2rem",
    borderBottom: "2px solid #444",
    paddingBottom: "0.5rem",
    marginBottom: "1rem",
  },
  list: {
    listStyle: "disc inside",
    fontSize: "1.125rem",
    lineHeight: 1.6,
  },
};