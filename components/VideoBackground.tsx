"use client";
export default function VideoBackground({ src }: { src: string }) {
  if (!src) return null;
  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      className="fixed inset-0 -z-10 w-full h-full object-cover opacity-60"
    >
      <source src={src} />
    </video>
  );
}
