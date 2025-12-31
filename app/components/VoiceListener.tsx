'use client';

import { useEffect } from 'react';

export default function VoiceListener() {
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch('/api/voice');
        const cmd = await res.json();
        if (!cmd || !cmd.action) return;

        if (cmd.action === 'addText') {
          const el = document.createElement('div');
          el.innerText = cmd.text;
          el.style.position = 'fixed';
          el.style.bottom = '20px';
          el.style.right = '20px';
          el.style.color = 'gold';
          el.style.zIndex = '9999';
          document.body.appendChild(el);
        }

        if (cmd.action === 'addVideo') {
          const video = document.createElement('video');
          video.src = cmd.src;
          video.autoplay = true;
          video.loop = true;
          video.muted = true;
          video.style.position = 'fixed';
          video.style.inset = '0';
          video.style.zIndex = '-1';
          document.body.appendChild(video);
        }

        if (cmd.action === 'changeTheme') {
          document.documentElement.style.setProperty('--accent', cmd.color);
        }
      } catch (e) {
        // Silent fail on API errors
      }
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return null;
}
