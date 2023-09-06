import { AccordionGroup, Button, Typography } from "@mui/joy";
import { gql, useMutation } from "urql";
import { ViewSlice } from "./slice";
import { SliceInfo } from "../../interfaces/workout-interfaces";
import { ViewSets } from "./set";
export function Track() {
  const addWorkoutMutation = gql`
    mutation AddWorkout($name: String!) {
      addWorkout(name: $name)
    }
  `;
  const [result, executeMutation] = useMutation(addWorkoutMutation);

  const executeAddWorkout = (newName: string) => {
    const variables = { name: newName };
    executeMutation(variables);
  };

  const testSlice: SliceInfo = {
    exercise: "Bench Press",
    sets: [
      { reps: 10, weight: 135 },
      { reps: 8, weight: 155 },
      { reps: 8, weight: 165 },
      { reps: 8, weight: 175 },
      { reps: 8, weight: 185 },
    ],
  };

  return (
    <>
      <Typography level="h1">Track</Typography>
      <Button
        onClick={() => executeAddWorkout("hello from workout service in react")}
      >
        New Workout
      </Button>
      <AccordionGroup variant="outlined">
        <ViewSlice exercise={testSlice.exercise} sets={testSlice.sets}>
          <ViewSets sets={testSlice.sets}></ViewSets>
        </ViewSlice>
      </AccordionGroup>
    </>
  );
}
