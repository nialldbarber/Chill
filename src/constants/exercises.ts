// categories
// - calm
// - energy
// - night

// types
// - 1 = in hold out hold
// - 2 = in out hold
// - 3 = in hold out
// - 4 = in out

export const IN = 'In';
export const OUT = 'Out';
export const HOLD = 'Hold';

const page = 'Exercise';

export const FEELING_MAPPED_KEY: Record<string, string> = {
  activated: 'energy',
  alleviated: 'calm',
  awake: 'energy',
  balanced: 'calm',
  blissful: 'calm',
  calm: 'calm',
  clear: 'calm',
  cool: 'calm',
  dream: 'night',
  euphoric: 'energy',
  energized: 'energy',
  focused: 'energy',
  'pain relief': 'calm',
  peaceful: 'calm',
  recharged: 'energy',
  relaxed: 'calm',
  'rise and shine': 'energy',
  sleepy: 'night',
  stimulated: 'energy',
  tranquil: 'night',
  uplifted: 'energy',
  unwind: 'night',
};

export const feelingCategories = ['calm', 'energy', 'night'];

export const feelings = [
  'activated',
  'alleviated',
  'awake',
  'balanced',
  'blissful',
  'calm',
  'clear',
  'cool',
  'dream',
  'euphoric',
  'energized',
  'focused',
  'pain relief',
  'peaceful',
  'recharged',
  'relaxed',
  'rise and shine',
  'sleepy',
  'stimulated',
  'tranquil',
  'uplifted',
  'unwind',
];

export const FEELINGS_COLOR_MAP: Record<string, string> = {
  calm: 'calm',
  energy: 'primary',
  night: 'night',
};

export type ConfigT = {
  id: number;
  page: string;
  exerciseName: string;
  exercise: number[];
  type?: number;
  theme: string;
  category?: string;
  tags?: string[];
};

export const CONFIG: ConfigT[] = [
  {
    id: 1,
    page,
    exerciseName: 'Box',
    exercise: [4, 4, 4, 4],
    type: 1,
    theme: 'dark',
    category: 'calm',
    tags: [
      'alleviated',
      'balanced',
      'calm',
      'clear',
      'cool',
      'peaceful',
      'relaxed',
      'tranquil',
    ],
  },
  {
    id: 2,
    page,
    exerciseName: 'Calm',
    exercise: [4, 7, 8, 0],
    type: 3,
    theme: 'dark',
    category: 'calm',
    tags: ['uplifted'],
  },
  {
    id: 3,
    page,
    exerciseName: 'Deep',
    exercise: [5, 0, 5, 0],
    type: 4,
    theme: 'dark',
    category: 'calm',
    tags: ['uplifted'],
  },
  {
    id: 4,
    page,
    exerciseName: 'Awake',
    exercise: [6, 0, 2, 0],
    type: 4,
    theme: 'dark',
    category: 'energy',
    tags: [
      'activated',
      'awake',
      'euphoric',
      'energized',
      'rise and shine',
      'stimulated',
    ],
  },
  {
    id: 5,
    page,
    exerciseName: 'Recharge',
    exercise: [5, 3, 4, 3],
    type: 1,
    theme: 'dark',
    category: 'energy',
    tags: [
      'activated',
      'awake',
      'energized',
      'focused',
      'recharged',
      'rise and shine',
      'stimulated',
    ],
  },
  {
    id: 6,
    page,
    exerciseName: 'Dream',
    exercise: [5, 15, 5, 0],
    type: 3,
    theme: 'dark',
    category: 'night',
    tags: [
      'balanced',
      'calm',
      'dream',
      'peaceful',
      'relaxed',
      'sleepy',
      'tranquil',
      'unwind',
    ],
  },
  {
    id: 7,
    page,
    exerciseName: 'Alleviate',
    exercise: [4, 2, 4, 2],
    type: 1,
    theme: 'dark',
    category: 'calm',
    tags: [
      'alleviated',
      'balanced',
      'blissful',
      'calm',
      'clear',
      'cool',
      'dream',
      'pain relief',
      'peaceful',
      'relaxed',
      'tranquil',
    ],
  },
  {
    id: 8,
    page,
    exerciseName: 'Anxiety Ease',
    exercise: [4, 2, 6, 0],
    type: 3,
    theme: 'dark',
    category: 'calm',
    tags: [
      'alleviated',
      'balanced',
      'blissful',
      'calm',
      'clear',
      'cool',
      'dream',
      'pain relief',
      'peaceful',
      'relaxed',
      'tranquil',
    ],
  },
];
