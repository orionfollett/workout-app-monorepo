import { AccordionGroup, Typography } from "@mui/joy";
import { ViewSets } from "./set";
import { ViewSlice } from "./slice";
import { SliceInfo } from "../../interfaces/workout-interfaces";

export interface WorkoutInfo {
  name: string;
  slices: SliceInfo[];
}
export function ViewWorkout(workoutId: number) {
  const workout: WorkoutInfo = { name: "hello", slices: [] };
  return (
    <>
      <Typography level="title-md">{workout.name}</Typography>
      <AccordionGroup variant="outlined">
        {workout.slices.map((slice) => {
          return (
            <>
              <ViewSlice exercise={slice.exercise} sets={slice.sets}>
                <ViewSets sets={slice.sets}></ViewSets>
              </ViewSlice>
            </>
          );
        })}
      </AccordionGroup>
    </>
  );
}
