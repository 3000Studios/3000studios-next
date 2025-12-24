declare module 'howler' {
  export class Howl {
    constructor(options: {
      src: string[];
      volume?: number;
      loop?: boolean;
      autoplay?: boolean;
      onend?: () => void;
      onload?: () => void;
      onerror?: () => void;
    });
    play(): number;
    pause(): void;
    stop(): void;
    mute(muted: boolean): void;
    volume(vol?: number): number;
    seek(seek?: number): number;
    rate(rate?: number): number;
    playing(): boolean;
  }

  export class Howler {
    static mute(muted: boolean): void;
    static volume(volume?: number): number;
  }
}
