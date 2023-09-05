import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
  Button,
  Typography,
} from "@mui/joy";
import { gql, useMutation } from "urql";
import { SliceInfo, ViewSlice } from "./view-slice";
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
    reps: [10, 8, 7, 6],
    weight: [135, 155, 175, 185],
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
        <ViewSlice
          exercise={testSlice.exercise}
          reps={testSlice.reps}
          weight={testSlice.weight}
        />
      </AccordionGroup>
    </>
  );
}
