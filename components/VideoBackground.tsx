"use client";

interface VideoBackgroundProps {
  videoSrc?: string;
  opacity?: number;
  overlayColor?: string;
  className?: string;
}

export default function VideoBackground({
  videoSrc = "https://videos.pexels.com/video-files/3571898/3571898-uhd_1440_2560_30fps.mp4",
  opacity = 0.3,
  overlayColor = "from-black/85 via-black/70 to-black/85",
  className = "",
}: VideoBackgroundProps) {
  return (
    <div className={`absolute inset-0 z-0 overflow-hidden ${className}`}>
      <video
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
        style={{ opacity }}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      <div className={`absolute inset-0 bg-gradient-to-b ${overlayColor}`} />
    </div>
  );
}
