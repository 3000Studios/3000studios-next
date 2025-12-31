'use client';

import { useEffect, useRef } from 'react';

const useVoiceToCommand = (onCommand: (command: string) => void) => {
  const onCommandHandler = useRef(onCommand);

  useEffect(() => {
    onCommandHandler.current = onCommand;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn('Speech recognition not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          const transcript = event.results[i][0].transcript.trim();
          console.log('Voice command:', transcript);
          onCommandHandler.current(transcript);
        }
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
    };

    console.log('Starting voice recognition...');
    recognition.start();

    return () => {
      console.log('Stopping voice recognition...');
      recognition.stop();
    };
  }, [onCommand]);
};

export default useVoiceToCommand;
