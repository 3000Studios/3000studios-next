"use client";

import { useEffect, useState } from "react";
import DialogueBrain from "../dialogue/DialogueBrain";
import AvatarSpeech from "../dialogue/AvatarSpeech";

export default function AIDirector({ avatar }) {
  const [line, setLine] = useState("");

  const brain = DialogueBrain({
    onDialogue: (l) => setLine(l),
  });

  useEffect(() => {
    // Auto speaks whenever emotion changes
    const emotionHandler = (e: MessageEvent) => {
      if (String(e.data).startsWith("emotion:")) {
        brain.generateLine("emotion shift");
      }
    };

    // Auto speaks whenever the crowd reacts
    const crowdHandler = (e: MessageEvent) => {
      if (String(e.data).startsWith("crowd:")) {
        brain.generateLine("crowd reaction");
      }
    };

    window.addEventListener("message", emotionHandler);
    window.addEventListener("message", crowdHandler);

    // Interval dialogue so avatar never shuts up
    const interval = setInterval(() => {
      brain.generateLine("interval fill");
    }, 9000);

    return () => {
      clearInterval(interval);
      window.removeEventListener("message", emotionHandler);
      window.removeEventListener("message", crowdHandler);
    };
  }, []);

  return <AvatarSpeech text={line} avatar={avatar} />;
}
