export const processVoiceCommand = async (_audio: ArrayBuffer | Blob) => ({
  command: "",
  success: true,
});
export const synthesizeSpeech = async (_text: string) => ({ audio: null });
