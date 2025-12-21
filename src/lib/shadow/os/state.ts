/**
 * ShadowOS State Management
 * Global state for Shadow AI system and UI mood reactivity
 * Used by Navigation and other components for mood-based theming
 * Based on 3000structure.txt blueprint MODULE 17
 */

"use client";

import { create } from "zustand";

export type UIMood =
  | "neutral"
  | "gold"
  | "blue"
  | "purple-alert"
  | "teal"
  | "cyber-cyan";
export type Emotion =
  | "neutral"
  | "happy"
  | "excited"
  | "focused"
  | "alert"
  | "calm";

interface ShadowOSState {
  // UI Mood for reactive theming
  uiMood: UIMood;
  setUIMood: (mood: UIMood) => void;

  // Avatar emotion state
  emotion: Emotion;
  intensity: number;
  updateEmotion: (emotion: Emotion, intensity: number) => void;

  // Response tracking
  lastResponse: string;
  setResponse: (response: string) => void;

  // Avatar audio
  avatarAudio: string;
  setAvatarAudio: (audio: string) => void;
}

export const useShadowOS = create<ShadowOSState>((set) => ({
  // Initial state
  uiMood: "neutral",
  emotion: "neutral",
  intensity: 0.4,
  lastResponse: "",
  avatarAudio: "",

  // Actions
  setUIMood: (mood) => set({ uiMood: mood }),

  updateEmotion: (emotion, intensity) =>
    set({
      emotion,
      intensity,
      // Auto-update UI mood based on emotion
      uiMood: emotionToMood(emotion),
    }),

  setResponse: (response) => set({ lastResponse: response }),

  setAvatarAudio: (audio) => set({ avatarAudio: audio }),
}));

/**
 * Map avatar emotion to UI mood
 */
function emotionToMood(emotion: Emotion): UIMood {
  switch (emotion) {
    case "happy":
    case "excited":
      return "gold";
    case "focused":
      return "cyber-cyan";
    case "alert":
      return "purple-alert";
    case "calm":
      return "teal";
    default:
      return "neutral";
  }
}
