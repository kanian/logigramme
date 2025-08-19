import { emotions } from "../types/emotions";

export const calculateEmotionHSL = (emotionKey: string, arousal = 0.7) => {
  const emotion = emotions[emotionKey];
  if (!emotion) return 'hsl(0, 50%, 50%)';
  const effectiveArousal = Math.min(1, Math.max(0, emotion.baseArousal * arousal));
  const saturation = Math.round(40 + (effectiveArousal * 55));
  const lightness = emotion.type?.includes('agonic') ?
    Math.round(35 + (effectiveArousal * 20)) :
    Math.round(50 + (effectiveArousal * 20));
  return `hsl(${emotion.hue}, ${saturation}%, ${lightness}%)`;
};