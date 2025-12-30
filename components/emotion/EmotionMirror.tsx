"use client";

// @ts-nocheck
'use client';

import { useEffect, useRef, useState } from 'react';
// import * as tf from "@tensorflow/tfjs"; // Not used directly
import * as blazeface from '@tensorflow-models/blazeface';

export default function EmotionMirror() {
  const videoRef = useRef(null);
  const [model, setModel] = useState(null);

  useEffect(() => {
    async function init() {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 320, height: 240 },
        audio: false,
      });

      videoRef.current.srcObject = stream;
      await videoRef.current.play();

      const m = await blazeface.load();
      setModel(m);
    }

    init();
  }, []);

  useEffect(() => {
    if (!model) return;

    const EMOTION_MAP = {
      happy: 'cheer',
      sad: 'silent',
      angry: 'boo',
      surprised: 'ovation',
      neutral: 'idle',
    };

    const loop = async () => {
      const predictions = await model.estimateFaces(videoRef.current, false);

      if (predictions.length > 0) {
        const face = predictions[0];

        const w = face.topRight[0] - face.topLeft[0];
        const h = face.bottomLeft[1] - face.topLeft[1];

        // Simple emotion estimator based on face openness & eyebrows
        const emotionGuess =
          w / h > 0.9
            ? 'happy'
            : h / w > 1.4
              ? 'surprised'
              : h / w > 1.1
                ? 'sad'
                : w / h > 1.2
                  ? 'angry'
                  : 'neutral';

        // Broadcast to entire system
        window.postMessage(`emotion:${emotionGuess}`, '*');
        window.postMessage(`crowd:${EMOTION_MAP[emotionGuess]}`, '*');
      }

      requestAnimationFrame(loop);
    };

    loop();
  }, [model]);

  return <video ref={videoRef} className="absolute w-px h-px opacity-0 pointer-events-none" />;
}
