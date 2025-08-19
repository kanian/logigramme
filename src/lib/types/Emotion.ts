export type Emotion = {
  hue: number;
  valence: number;
  baseArousal: number;
  type:
    | 'hedonic'
    | 'agonic'
    | 'hedonic-secondary'
    | 'agonic-secondary'
    | 'cross-secondary';
  name: string;
};
