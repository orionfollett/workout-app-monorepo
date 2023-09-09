import {
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  Typography,
} from "@mui/joy";
import { getAllWorkoutNames } from "../../services/workout-service";
import { CreateWorkout } from "./new-workout";

export function Track() {
  const [workouts, refreshWorkouts] = getAllWorkoutNames();

  return (
    <>
      <Typography level="h1">Track</Typography>
      <CreateWorkout refreshWorkouts={refreshWorkouts}></CreateWorkout>
      <Typography level="h3">Past Workouts</Typography>

      <List>
        {workouts
          .map((workout: { name: string; id: number }) => {
            return (
              <div key={workout.id}>
                <ListItem>
                  <ListItemButton
                    component="a"
                    href={"/workout/" + workout.id}
                    variant="outlined"
                  >
                    <ListItemContent>{workout.name}</ListItemContent>
                  </ListItemButton>
                </ListItem>
              </div>
            );
          })
          .reverse()}
      </List>
    </>
  );
}
