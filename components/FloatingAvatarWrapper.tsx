"use client";
import dynamic from "next/dynamic";

const FloatingAvatar = dynamic(() => import("./FloatingAvatar"), {
  ssr: false,
});

export default function FloatingAvatarWrapper() {
  return <FloatingAvatar />;
}
