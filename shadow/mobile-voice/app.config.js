// Copyright (c) 2025 NAME.
// All rights reserved.
// Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.

export default {
  expo: {
    name: "ShadowVoiceOS",
    slug: "shadow-voiceos",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "dark",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#000014",
    },
    android: {
      package: "com.shadow.voiceos",
      permissions: [
        "INTERNET",
        "RECORD_AUDIO",
        "WAKE_LOCK",
        "FOREGROUND_SERVICE",
        "MODIFY_AUDIO_SETTINGS",
      ],
      adaptiveIcon: {
        foregroundImage: "./assets/icon.png",
        backgroundColor: "#000014",
      },
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.shadow.voiceos",
      infoPlist: {
        NSSpeechRecognitionUsageDescription:
          "Shadow Voice OS uses speech recognition for voice commands",
        NSMicrophoneUsageDescription:
          "Shadow Voice OS needs microphone access for hotword detection",
      },
    },
    extra: {
      wsServer: "ws://YOUR_PC_LOCAL_IP:3333",
      eas: {
        projectId: "YOUR_EAS_PROJECT_ID",
      },
    },
  },
};
