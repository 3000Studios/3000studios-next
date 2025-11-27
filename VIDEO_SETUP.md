<!--











































- Muted: Yes (for autoplay to work)- Autoplay: Enabled- Loop: Enabled- Optimized for web (H.264 codec)- Recommended resolution: 1920x1080 or higher- Format: MP4## Video Specifications- Fallback: Corporate gradient (automatic if video fails to load)- Primary: `/corporate-bg.mp4` (local file in public folder)The VideoBackground component is configured to use:## Current Video SourceIf you can't download the video, the site will automatically fall back to the corporate gradient background defined in Tailwind config.## Alternative: Use a Gradient Fallback```mv corporate-bg-noaudio.mp4 corporate-bg.mp4```bashThen rename:```ffmpeg -i corporate-bg.mp4 -an -c:v copy corporate-bg-noaudio.mp4```bashIf the video has audio, remove it using FFmpeg:## Remove Audio from Video (Optional)4. Place it in the `public` folder: `public/corporate-bg.mp4`3. Save the video as `corporate-bg.mp4`2. Download the video (requires authentication)1. Visit: https://sora.chatgpt.com/p/s_6926f554649c819189288f78300ea72f?psh=HXVzZXItZ0w5WTM4R1NrZjB4WWJxOFUzcnFjRWlk.id2dyVpG-UvJa## Download the Sora Video  Copyright (c) 2025 NAME.
  All rights reserved.
  Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.
-->

# Video Wallpaper Setup Instructions