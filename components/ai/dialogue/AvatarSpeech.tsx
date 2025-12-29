// @ts-nocheck
"use client";

import { useEffect, useRef } from "react";

export default function AvatarSpeech({ text, avatar }) {
  const synthRef = useRef(
    typeof window !== "undefined" ? window.speechSynthesis : null,
  );

  useEffect(() => {
    if (!text || !avatar || !synthRef.current) return;

    const utter = new window.SpeechSynthesisUtterance(text);

    utter.pitch = 1.0;
    utter.rate = 1.1;
    utter.volume = 1;

    // Animate mouth
    utter.onstart = () => avatar.mouth.startTalking();
    utter.onend = () => avatar.mouth.stopTalking();

    synthRef.current.speak(utter);
  }, [text, avatar]);

  return null;
}
