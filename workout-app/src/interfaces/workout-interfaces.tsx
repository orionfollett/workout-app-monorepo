export interface WorkoutInfo {
  name: string;
  slices: SliceInfo[];
}

export interface SliceInfo {
  exercise: string;
  sets: SetInfo[];
}

export interface SetInfo {
  weight: number;
  reps: number;
}
