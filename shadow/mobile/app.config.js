// Copyright (c) 2025 NAME.
// All rights reserved.
// Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.

export default {
  expo: {
    name: "ShadowMobile",
    slug: "shadow-mobile",
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
      package: "com.shadow.mobilecontroller",
      permissions: ["INTERNET", "RECORD_AUDIO", "READ_EXTERNAL_STORAGE"],
      adaptiveIcon: {
        foregroundImage: "./assets/icon.png",
        backgroundColor: "#000014",
      },
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.shadow.mobilecontroller",
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      shadowServer: "ws://YOUR_PC_LOCAL_IP:3333",
      eas: {
        projectId: "YOUR_EAS_PROJECT_ID",
      },
    },
  },
};
