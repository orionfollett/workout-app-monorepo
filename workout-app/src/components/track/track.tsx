import { Button, Typography } from "@mui/joy";
import { gql, useMutation } from "urql";
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

  return (
    <>
      <Typography level="h1">Track</Typography>
      <Button
        onClick={() => executeAddWorkout("hello from workout service in react")}
      >
        New Workout
      </Button>
    </>
  );
}
