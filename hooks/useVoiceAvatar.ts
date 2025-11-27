/*
 *   Copyright (c) 2025 NAME.
 *   All rights reserved.
 *   Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.
 */

"use client";

import { useState, useEffect } from "react";

export default function useVoiceAvatar() {
  const [state, setState] = useState({
    talking: false,
    volume: 0,
    mood: "idle"
  });

  useEffect(() => {
    // Check if browser supports getUserMedia
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.warn("Voice Avatar: getUserMedia not supported");
      return;
    }

    let audioContext: AudioContext;
    let analyser: AnalyserNode;
    let microphone: MediaStreamAudioSourceNode;
    let dataArray: Uint8Array;
    let animationFrame: number;

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        audioContext = new AudioContext();
        analyser = audioContext.createAnalyser();
        microphone = audioContext.createMediaStreamSource(stream);
        
        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);

        microphone.connect(analyser);

        // Animation loop to detect speech
        const detectSpeech = () => {
          analyser.getByteFrequencyData(dataArray);

          // Calculate average volume
          const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
          const normalizedVolume = average / 255; // 0-1 range

          // Determine if talking based on volume threshold
          const isTalking = normalizedVolume > 0.02; // Adjust sensitivity
          
          // Determine mood based on volume intensity
          let newMood = "idle";
          if (normalizedVolume > 0.4) {
            newMood = "angry"; // Loud voice
          } else if (normalizedVolume > 0.15 && isTalking) {
            newMood = "excited"; // Moderate voice
          } else if (isTalking) {
            newMood = "talking"; // Soft voice
          }

          setState({
            talking: isTalking,
            volume: normalizedVolume,
            mood: newMood
          });

          animationFrame = requestAnimationFrame(detectSpeech);
        };

        detectSpeech();
      })
      .catch((error) => {
        console.error("Voice Avatar: Microphone access denied", error);
      });

    // Cleanup
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
      if (audioContext) {
        audioContext.close();
      }
    };
  }, []);

  return state;
}
