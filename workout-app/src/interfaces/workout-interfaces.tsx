export interface WorkoutInfo {
  id: number;
  timestamp: string;
  name: string;
  slices: SliceInfo[];
}

export interface SliceInfo {
  id: number;
  exercise: string;
  sets: SetInfo[];
}

export interface SetInfo {
  id: number;
  weight: number;
  reps: number;
}
