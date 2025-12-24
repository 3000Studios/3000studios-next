import React from "react";

export const Background = () => {
  return (
    <>
      <video autoPlay muted loop playsInline className="video-bg">
        <source
          src="https://assets.mixkit.co/videos/preview/mixkit-black-smoke-covering-the-screen-2101-large.mp4"
          type="video/mp4"
        />
      </video>
      <div className="noise-overlay"></div>
      <div className="fixed inset-0 z-[-1] bg-gradient-to-b from-void/90 via-transparent to-void pointer-events-none"></div>
    </>
  );
};
