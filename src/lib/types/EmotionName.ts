import { getAvailableContexts } from '../functions/getAvailableContexts';

export type EmotionName = keyof ReturnType<typeof getAvailableContexts>;
