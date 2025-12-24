/**
 * Voice Integration Library
<<<<<<< HEAD
 *
 * Provides Web Speech API abstraction, server-side TTS/STT fallback,
 * voice activation hooks, and transcription utilities.
 *
=======
 * 
 * Provides Web Speech API abstraction, server-side TTS/STT fallback,
 * voice activation hooks, and transcription utilities.
 * 
>>>>>>> origin/copilot/update-main-with-all-branches
 * Features:
 * - Browser Web Speech API for speech recognition
 * - Server-side OpenAI Whisper fallback
 * - Text-to-speech with browser and server options
 * - Voice activation detection
 * - Real-time transcription
 * - Multi-language support
 */

<<<<<<< HEAD
import { openai } from "./apiClients";
=======
import { openai } from './apiClients';
>>>>>>> origin/copilot/update-main-with-all-branches

// ==========================================
// TYPES & INTERFACES
// ==========================================

export interface VoiceConfig {
  language: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
}

export interface TranscriptionResult {
  transcript: string;
  confidence: number;
  isFinal: boolean;
  alternatives?: string[];
}

export interface VoiceRecognitionCallbacks {
  onResult?: (result: TranscriptionResult) => void;
  onError?: (error: Error) => void;
  onStart?: () => void;
  onEnd?: () => void;
}

export interface TTSOptions {
  voice?: string;
  pitch?: number;
  rate?: number;
  volume?: number;
  lang?: string;
}

// ==========================================
// TYPE DEFINITIONS FOR WEB SPEECH API
// ==========================================

// Web Speech API type definitions (since they're not in standard TypeScript DOM types)
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface ISpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  onstart: (() => void) | null;
}

interface WindowWithSpeech extends Window {
  SpeechRecognition?: new () => ISpeechRecognition;
  webkitSpeechRecognition?: new () => ISpeechRecognition;
}

// ==========================================
// WEB SPEECH API (BROWSER)
// ==========================================

export class VoiceRecognition {
  private recognition: ISpeechRecognition | null = null;
  private isListening = false;
  private config: VoiceConfig;
  private callbacks: VoiceRecognitionCallbacks;

<<<<<<< HEAD
  constructor(
    config: Partial<VoiceConfig> = {},
    callbacks: VoiceRecognitionCallbacks = {},
  ) {
    this.config = {
      language: config.language || process.env.VOICE_LANGUAGE || "en-US",
      continuous: config.continuous ?? process.env.VOICE_CONTINUOUS === "true",
=======
  constructor(config: Partial<VoiceConfig> = {}, callbacks: VoiceRecognitionCallbacks = {}) {
    this.config = {
      language: config.language || process.env.VOICE_LANGUAGE || 'en-US',
      continuous: config.continuous ?? (process.env.VOICE_CONTINUOUS === 'true'),
>>>>>>> origin/copilot/update-main-with-all-branches
      interimResults: config.interimResults ?? true,
      maxAlternatives: config.maxAlternatives || 3,
    };
    this.callbacks = callbacks;
<<<<<<< HEAD

=======
    
>>>>>>> origin/copilot/update-main-with-all-branches
    this.initializeRecognition();
  }

  private initializeRecognition() {
<<<<<<< HEAD
    if (typeof window === "undefined") {
      console.warn(
        "Voice recognition is only available in browser environments",
      );
=======
    if (typeof window === 'undefined') {
      console.warn('Voice recognition is only available in browser environments');
>>>>>>> origin/copilot/update-main-with-all-branches
      return;
    }

    const win = window as unknown as WindowWithSpeech;
<<<<<<< HEAD
    const SpeechRecognition =
      win.SpeechRecognition || win.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn("Speech recognition not supported in this browser");
=======
    const SpeechRecognition = win.SpeechRecognition || win.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      console.warn('Speech recognition not supported in this browser');
>>>>>>> origin/copilot/update-main-with-all-branches
      return;
    }

    this.recognition = new SpeechRecognition();
    this.recognition.lang = this.config.language;
    this.recognition.continuous = this.config.continuous;
    this.recognition.interimResults = this.config.interimResults;
    this.recognition.maxAlternatives = this.config.maxAlternatives;

    // Event handlers
    this.recognition.onstart = () => {
      this.isListening = true;
      this.callbacks.onStart?.();
    };

    this.recognition.onend = () => {
      this.isListening = false;
      this.callbacks.onEnd?.();
    };

    this.recognition.onresult = (event: any) => {
      const result = event.results[event.results.length - 1];
      const transcript = result[0].transcript;
      const confidence = result[0].confidence;
      const isFinal = result.isFinal;
<<<<<<< HEAD

=======
      
>>>>>>> origin/copilot/update-main-with-all-branches
      const alternatives = Array.from(result)
        .slice(1)
        .map((alt: any) => alt.transcript);

      this.callbacks.onResult?.({
        transcript,
        confidence,
        isFinal,
        alternatives,
      });
    };

    this.recognition.onerror = (event: any) => {
<<<<<<< HEAD
      this.callbacks.onError?.(
        new Error(`Speech recognition error: ${event.error}`),
      );
=======
      this.callbacks.onError?.(new Error(`Speech recognition error: ${event.error}`));
>>>>>>> origin/copilot/update-main-with-all-branches
    };
  }

  start() {
    if (!this.recognition) {
<<<<<<< HEAD
      throw new Error("Speech recognition not available");
    }

=======
      throw new Error('Speech recognition not available');
    }
    
>>>>>>> origin/copilot/update-main-with-all-branches
    if (!this.isListening) {
      this.recognition.start();
    }
  }

  stop() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
    }
  }

  abort() {
    if (this.recognition) {
      this.recognition.abort();
      this.isListening = false;
    }
  }

  isActive(): boolean {
    return this.isListening;
  }
}

// ==========================================
// TEXT-TO-SPEECH (BROWSER)
// ==========================================

export class TextToSpeech {
  private synth: SpeechSynthesis | null = null;
  private voices: SpeechSynthesisVoice[] = [];

  constructor() {
<<<<<<< HEAD
    if (typeof window !== "undefined") {
=======
    if (typeof window !== 'undefined') {
>>>>>>> origin/copilot/update-main-with-all-branches
      this.synth = window.speechSynthesis;
      this.loadVoices();
    }
  }

  private loadVoices() {
    if (!this.synth) return;

    this.voices = this.synth.getVoices();
<<<<<<< HEAD

=======
    
>>>>>>> origin/copilot/update-main-with-all-branches
    // Chrome loads voices asynchronously
    if (this.voices.length === 0) {
      this.synth.onvoiceschanged = () => {
        this.voices = this.synth!.getVoices();
      };
    }
  }

  speak(text: string, options: TTSOptions = {}) {
    if (!this.synth) {
<<<<<<< HEAD
      throw new Error("Text-to-speech not available");
    }

    const utterance = new SpeechSynthesisUtterance(text);

    if (options.voice) {
      const voice = this.voices.find((v) => v.name === options.voice);
      if (voice) utterance.voice = voice;
    }

=======
      throw new Error('Text-to-speech not available');
    }

    const utterance = new SpeechSynthesisUtterance(text);
    
    if (options.voice) {
      const voice = this.voices.find(v => v.name === options.voice);
      if (voice) utterance.voice = voice;
    }
    
>>>>>>> origin/copilot/update-main-with-all-branches
    if (options.pitch !== undefined) utterance.pitch = options.pitch;
    if (options.rate !== undefined) utterance.rate = options.rate;
    if (options.volume !== undefined) utterance.volume = options.volume;
    if (options.lang) utterance.lang = options.lang;

    this.synth.speak(utterance);
<<<<<<< HEAD

=======
    
>>>>>>> origin/copilot/update-main-with-all-branches
    return new Promise<void>((resolve, reject) => {
      utterance.onend = () => resolve();
      utterance.onerror = (error) => reject(error);
    });
  }

  stop() {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  pause() {
    if (this.synth) {
      this.synth.pause();
    }
  }

  resume() {
    if (this.synth) {
      this.synth.resume();
    }
  }

  getVoices(): SpeechSynthesisVoice[] {
    return this.voices;
  }

  isSpeaking(): boolean {
    return this.synth?.speaking ?? false;
  }
}

// ==========================================
// SERVER-SIDE TRANSCRIPTION (WHISPER API)
// ==========================================

export async function transcribeAudio(
  audioFile: File | Blob,
  options: {
    language?: string;
    prompt?: string;
<<<<<<< HEAD
    model?: "whisper-1";
  } = {},
): Promise<{ text: string; language?: string }> {
  try {
    if (!openai.isConfigured()) {
      throw new Error(
        "OpenAI API key not configured for server-side transcription",
      );
    }

    const formData = new FormData();
    formData.append("file", audioFile);
    formData.append("model", options.model || "whisper-1");

    if (options.language) {
      formData.append("language", options.language);
    }

    if (options.prompt) {
      formData.append("prompt", options.prompt);
=======
    model?: 'whisper-1';
  } = {}
): Promise<{ text: string; language?: string }> {
  try {
    if (!openai.isConfigured()) {
      throw new Error('OpenAI API key not configured for server-side transcription');
    }

    const formData = new FormData();
    formData.append('file', audioFile);
    formData.append('model', options.model || 'whisper-1');
    
    if (options.language) {
      formData.append('language', options.language);
    }
    
    if (options.prompt) {
      formData.append('prompt', options.prompt);
>>>>>>> origin/copilot/update-main-with-all-branches
    }

    const client = openai.client;
    const response = await client.audio.transcriptions.create({
      file: audioFile as any,
<<<<<<< HEAD
      model: options.model || "whisper-1",
=======
      model: options.model || 'whisper-1',
>>>>>>> origin/copilot/update-main-with-all-branches
      language: options.language,
      prompt: options.prompt,
    });

    return {
      text: response.text,
      language: options.language,
    };
  } catch (error) {
<<<<<<< HEAD
    console.error("Transcription error:", error);
    throw new Error("Failed to transcribe audio");
=======
    console.error('Transcription error:', error);
    throw new Error('Failed to transcribe audio');
>>>>>>> origin/copilot/update-main-with-all-branches
  }
}

// ==========================================
// SERVER-SIDE TEXT-TO-SPEECH (OPENAI TTS)
// ==========================================

export async function generateSpeech(
  text: string,
  options: {
<<<<<<< HEAD
    voice?: "alloy" | "echo" | "fable" | "onyx" | "nova" | "shimmer";
    model?: "tts-1" | "tts-1-hd";
    speed?: number;
  } = {},
): Promise<ArrayBuffer> {
  try {
    if (!openai.isConfigured()) {
      throw new Error("OpenAI API key not configured for server-side TTS");
=======
    voice?: 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer';
    model?: 'tts-1' | 'tts-1-hd';
    speed?: number;
  } = {}
): Promise<ArrayBuffer> {
  try {
    if (!openai.isConfigured()) {
      throw new Error('OpenAI API key not configured for server-side TTS');
>>>>>>> origin/copilot/update-main-with-all-branches
    }

    const client = openai.client;
    const response = await client.audio.speech.create({
<<<<<<< HEAD
      model: options.model || "tts-1",
      voice: options.voice || "alloy",
=======
      model: options.model || 'tts-1',
      voice: options.voice || 'alloy',
>>>>>>> origin/copilot/update-main-with-all-branches
      input: text,
      speed: options.speed,
    });

    return await response.arrayBuffer();
  } catch (error) {
<<<<<<< HEAD
    console.error("TTS error:", error);
    throw new Error("Failed to generate speech");
=======
    console.error('TTS error:', error);
    throw new Error('Failed to generate speech');
>>>>>>> origin/copilot/update-main-with-all-branches
  }
}

// ==========================================
// VOICE ACTIVATION DETECTION
// ==========================================

export class VoiceActivationDetector {
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private microphone: MediaStreamAudioSourceNode | null = null;
  private isMonitoring = false;
  private threshold: number;
  private onActivation?: () => void;
  private onDeactivation?: () => void;

  constructor(
    threshold: number = 0.01,
    callbacks: {
      onActivation?: () => void;
      onDeactivation?: () => void;
<<<<<<< HEAD
    } = {},
=======
    } = {}
>>>>>>> origin/copilot/update-main-with-all-branches
  ) {
    this.threshold = threshold;
    this.onActivation = callbacks.onActivation;
    this.onDeactivation = callbacks.onDeactivation;
  }

  async start() {
<<<<<<< HEAD
    if (typeof window === "undefined") {
      throw new Error(
        "Voice activation detection is only available in browser",
      );
=======
    if (typeof window === 'undefined') {
      throw new Error('Voice activation detection is only available in browser');
>>>>>>> origin/copilot/update-main-with-all-branches
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
<<<<<<< HEAD

=======
      
>>>>>>> origin/copilot/update-main-with-all-branches
      this.audioContext = new AudioContext();
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 512;
      this.analyser.smoothingTimeConstant = 0.8;
<<<<<<< HEAD

      this.microphone = this.audioContext.createMediaStreamSource(stream);
      this.microphone.connect(this.analyser);

      this.isMonitoring = true;
      this.monitor();
    } catch (error) {
      console.error("Failed to start voice activation detection:", error);
=======
      
      this.microphone = this.audioContext.createMediaStreamSource(stream);
      this.microphone.connect(this.analyser);
      
      this.isMonitoring = true;
      this.monitor();
    } catch (error) {
      console.error('Failed to start voice activation detection:', error);
>>>>>>> origin/copilot/update-main-with-all-branches
      throw error;
    }
  }

  private monitor() {
    if (!this.analyser || !this.isMonitoring) return;

    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
<<<<<<< HEAD

    const check = () => {
      if (!this.isMonitoring) return;

      this.analyser!.getByteFrequencyData(dataArray);

      const average = dataArray.reduce((a, b) => a + b) / bufferLength;
      const normalized = average / 255;

=======
    
    const check = () => {
      if (!this.isMonitoring) return;
      
      this.analyser!.getByteFrequencyData(dataArray);
      
      const average = dataArray.reduce((a, b) => a + b) / bufferLength;
      const normalized = average / 255;
      
>>>>>>> origin/copilot/update-main-with-all-branches
      if (normalized > this.threshold) {
        this.onActivation?.();
      } else {
        this.onDeactivation?.();
      }
<<<<<<< HEAD

      requestAnimationFrame(check);
    };

=======
      
      requestAnimationFrame(check);
    };
    
>>>>>>> origin/copilot/update-main-with-all-branches
    check();
  }

  stop() {
    this.isMonitoring = false;
<<<<<<< HEAD

=======
    
>>>>>>> origin/copilot/update-main-with-all-branches
    if (this.microphone) {
      this.microphone.disconnect();
      this.microphone = null;
    }
<<<<<<< HEAD

=======
    
>>>>>>> origin/copilot/update-main-with-all-branches
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
  }

  setThreshold(threshold: number) {
    this.threshold = threshold;
  }
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

/**
 * Check if browser supports speech recognition
 */
export function isSpeechRecognitionSupported(): boolean {
<<<<<<< HEAD
  if (typeof window === "undefined") return false;
  return !!(
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
=======
  if (typeof window === 'undefined') return false;
  return !!(
    (window as any).SpeechRecognition || 
    (window as any).webkitSpeechRecognition
>>>>>>> origin/copilot/update-main-with-all-branches
  );
}

/**
 * Check if browser supports speech synthesis
 */
export function isSpeechSynthesisSupported(): boolean {
<<<<<<< HEAD
  if (typeof window === "undefined") return false;
  return "speechSynthesis" in window;
=======
  if (typeof window === 'undefined') return false;
  return 'speechSynthesis' in window;
>>>>>>> origin/copilot/update-main-with-all-branches
}

/**
 * Get available speech recognition languages
 */
export function getSupportedLanguages(): string[] {
  return [
<<<<<<< HEAD
    "en-US",
    "en-GB",
    "en-AU",
    "en-CA",
    "en-IN",
    "es-ES",
    "es-MX",
    "es-US",
    "fr-FR",
    "fr-CA",
    "de-DE",
    "it-IT",
    "pt-BR",
    "pt-PT",
    "ru-RU",
    "ja-JP",
    "zh-CN",
    "zh-TW",
    "ko-KR",
    "ar-SA",
    "hi-IN",
=======
    'en-US', 'en-GB', 'en-AU', 'en-CA', 'en-IN',
    'es-ES', 'es-MX', 'es-US',
    'fr-FR', 'fr-CA',
    'de-DE',
    'it-IT',
    'pt-BR', 'pt-PT',
    'ru-RU',
    'ja-JP',
    'zh-CN', 'zh-TW',
    'ko-KR',
    'ar-SA',
    'hi-IN',
>>>>>>> origin/copilot/update-main-with-all-branches
  ];
}

/**
 * Record audio from microphone
 */
<<<<<<< HEAD
export async function recordAudio(duration: number = 5000): Promise<Blob> {
  if (typeof window === "undefined") {
    throw new Error("Audio recording is only available in browser");
=======
export async function recordAudio(
  duration: number = 5000
): Promise<Blob> {
  if (typeof window === 'undefined') {
    throw new Error('Audio recording is only available in browser');
>>>>>>> origin/copilot/update-main-with-all-branches
  }

  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const mediaRecorder = new MediaRecorder(stream);
  const chunks: BlobPart[] = [];

  return new Promise((resolve, reject) => {
    mediaRecorder.ondataavailable = (e) => {
      chunks.push(e.data);
    };

    mediaRecorder.onstop = () => {
<<<<<<< HEAD
      const blob = new Blob(chunks, { type: "audio/webm" });
      stream.getTracks().forEach((track) => track.stop());
=======
      const blob = new Blob(chunks, { type: 'audio/webm' });
      stream.getTracks().forEach(track => track.stop());
>>>>>>> origin/copilot/update-main-with-all-branches
      resolve(blob);
    };

    mediaRecorder.onerror = (error) => {
<<<<<<< HEAD
      stream.getTracks().forEach((track) => track.stop());
=======
      stream.getTracks().forEach(track => track.stop());
>>>>>>> origin/copilot/update-main-with-all-branches
      reject(error);
    };

    mediaRecorder.start();
    setTimeout(() => mediaRecorder.stop(), duration);
  });
}

// Export everything
export default {
  VoiceRecognition,
  TextToSpeech,
  VoiceActivationDetector,
  transcribeAudio,
  generateSpeech,
  recordAudio,
  isSpeechRecognitionSupported,
  isSpeechSynthesisSupported,
  getSupportedLanguages,
};
