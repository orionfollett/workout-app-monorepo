import { AccordionGroup, Typography } from "@mui/joy";
import { ViewSets } from "./set";
import { ViewSlice } from "./slice";
import { SliceInfo, WorkoutInfo } from "../../interfaces/workout-interfaces";
import { getWorkoutById } from "../../services/workout-service";
import { useParams } from "react-router-dom";

// export function ViewWorkout({ workoutId }: { workoutId: number }) {
export function ViewWorkout() {
  const id = +(useParams().id || "0");
  const workout: WorkoutInfo = getWorkoutById(id);
  return (
    <>
      <Typography level="title-md">{workout?.name}</Typography>
      <AccordionGroup variant="outlined">
        {workout?.slices.map((slice) => {
          return (
            <div key={slice.id}>
              <ViewSlice
                id={slice.id}
                exercise={slice.exercise}
                sets={slice.sets}
              >
                <ViewSets sets={slice.sets}></ViewSets>
              </ViewSlice>
            </div>
          );
        })}
      </AccordionGroup>
    </>
  );
}
