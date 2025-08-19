import { emotions } from "../types/emotions";

export const getNodeSize = (emotionKey: string, globalArousal: number) => {
  const emotion = emotions[emotionKey];
  if (!emotion) return 60;
  const effectiveArousal = emotion.baseArousal * globalArousal;
  return Math.round(50 + (effectiveArousal * 30));
};