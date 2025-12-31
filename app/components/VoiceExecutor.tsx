'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function VoiceExecutor() {
  const router = useRouter();

  useEffect(() => {
    const tick = setInterval(async () => {
      try {
        const res = await fetch('/api/voice');
        const cmd = await res.json();
        if (!cmd?.action) return;

        if (cmd.action === 'navigate') {
          router.push(cmd.path);
        }

        if (cmd.action === 'addImage') {
          const img = document.createElement('img');
          img.src = cmd.src;
          img.style.maxWidth = '400px';
          img.style.position = 'fixed';
          img.style.bottom = '20px';
          img.style.left = '20px';
          img.style.zIndex = '9999';
          document.body.appendChild(img);
        }

        if (cmd.action === 'injectHTML') {
          const wrapper = document.createElement('div');
          wrapper.innerHTML = cmd.html;
          document.body.appendChild(wrapper);
        }

        if (cmd.action === 'setCSS') {
          const el = document.querySelector(cmd.selector) as HTMLElement;
          if (!el) return;
          Object.entries(cmd.css).forEach(([k, v]) => {
            el.style.setProperty(k, v);
          });
        }
      } catch (e) {
        // Silent fail
      }
    }, 1000);

    return () => clearInterval(tick);
  }, [router]);

  return null;
}
