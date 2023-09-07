import {
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  Typography,
} from "@mui/joy";
import { gql, useMutation } from "urql";
import { getAllWorkoutNames } from "../../services/workout-service";
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

  const workoutNames = getAllWorkoutNames() || [];

  return (
    <>
      <Typography level="h1">Track</Typography>
      <Button
        onClick={() => executeAddWorkout("hello from workout service in react")}
      >
        New Workout
      </Button>
      <Typography level="h3">Past Workouts</Typography>
      <List>
        {workoutNames.map((workoutName: string) => {
          return (
            <>
              <ListItem>
                <ListItemButton
                  component="a"
                  href="/workout/:id"
                  variant="outlined"
                >
                  <ListItemContent>{workoutName}</ListItemContent>
                </ListItemButton>
              </ListItem>
            </>
          );
        })}
      </List>
    </>
  );
}
