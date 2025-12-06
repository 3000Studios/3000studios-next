"use client";
import { useEffect } from "react";
import { Howl } from "howler";

export function AmbientAudio() {
  useEffect(() => {
    const playlist = [
      "/audio/corporate_ambient_1.mp3",
      "/audio/corporate_ambient_2.mp3",
      "/audio/corporate_ambient_3.mp3",
    ];
    let index = 0;
    const playTrack = () => {
      const track = new Howl({
        src: [playlist[index]],
        volume: 0.18,
        onend: () => {
          index = (index + 1) % playlist.length;
          playTrack();
        },
      });
      track.play();
    };
    playTrack();
  }, []);
  return null;
}
