"use client";

import React, { useEffect, useRef } from "react";
import Avatar from "@/components/Avatar";
import Particles from "@/components/Particles";

export default function HomePage() {
  return (
    <main style={styles.main}>
      {/* Background Particles */}
      <div style={styles.particleWrapper}>
        <Particles count={150} />
      </div>

      {/* Foreground Content */}
      <section style={styles.hero}>
        <h1 style={styles.title}>3000 Studios</h1>
        <p style={styles.subtitle}>
          Elite AI Engineering. Luxury UI. Autonomous Systems.
        </p>
      </section>

      {/* Animated CSS Avatar */}
      <section style={styles.avatarSection}>
        <Avatar />
      </section>
    </main>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  main: {
    width: "100%",
    height: "100vh",
    overflow: "hidden",
    margin: 0,
    padding: 0,
    background: "linear-gradient(135deg, #000000, #0c0f14)",
    color: "#fff",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  particleWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 1,
    pointerEvents: "none",
  },

  hero: {
    zIndex: 3,
    textAlign: "center",
    marginBottom: "2rem",
  },

  title: {
    fontSize: "4rem",
    fontWeight: 800,
    margin: 0,
    letterSpacing: "0.05em",
  },

  subtitle: {
    fontSize: "1.4rem",
    opacity: 0.8,
    marginTop: "0.5rem",
  },

  avatarSection: {
    zIndex: 4,
    marginTop: "1rem",
  },
};
