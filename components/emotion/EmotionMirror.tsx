'use client';

import { useEffect, useRef, useState } from 'react';

// BlazeFace model type
interface BlazeFaceModel {
  estimateFaces: (
    video: HTMLVideoElement,
    returnTensors: boolean
  ) => Promise<BlazeFacePrediction[]>;
}

interface BlazeFacePrediction {
  topLeft: [number, number];
  topRight: [number, number];
  bottomLeft: [number, number];
  bottomRight: [number, number];
}

type EmotionType = 'happy' | 'sad' | 'angry' | 'surprised' | 'neutral';

const EMOTION_MAP: Record<EmotionType, string> = {
  happy: 'cheer',
  sad: 'silent',
  angry: 'boo',
  surprised: 'ovation',
  neutral: 'idle',
};

export default function EmotionMirror() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [model, setModel] = useState<BlazeFaceModel | null>(null);

  useEffect(() => {
    async function init() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 320, height: 240 },
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }

        // Dynamically import blazeface
        const blazeface = await import('@tensorflow-models/blazeface');
        const m = await blazeface.load();
        setModel(m as unknown as BlazeFaceModel);
      } catch (error) {
        console.error('EmotionMirror init error:', error);
      }
    }

    init();
  }, []);

  useEffect(() => {
    if (!model || !videoRef.current) return;

    const loop = async () => {
      if (!videoRef.current) return;

      try {
        const predictions = await model.estimateFaces(videoRef.current, false);

        if (predictions.length > 0) {
          const face = predictions[0];

          const w = face.topRight[0] - face.topLeft[0];
          const h = face.bottomLeft[1] - face.topLeft[1];

          // Simple emotion estimator based on face openness & eyebrows
          let emotionGuess: EmotionType = 'neutral';
          if (w / h > 0.9) {
            emotionGuess = 'happy';
          } else if (h / w > 1.4) {
            emotionGuess = 'surprised';
          } else if (h / w > 1.1) {
            emotionGuess = 'sad';
          } else if (w / h > 1.2) {
            emotionGuess = 'angry';
          }

          // Broadcast to entire system
          window.postMessage(`emotion:${emotionGuess}`, '*');
          window.postMessage(`crowd:${EMOTION_MAP[emotionGuess]}`, '*');
        }
      } catch (error) {
        console.error('Face detection error:', error);
      }

      requestAnimationFrame(loop);
    };

    loop();
  }, [model]);

  return <video ref={videoRef} className="absolute w-px h-px opacity-0 pointer-events-none" />;
}
