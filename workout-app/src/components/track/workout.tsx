import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  AccordionGroup,
  ListItem,
  ListItemButton,
  ListItemContent,
  Sheet,
  Typography,
} from "@mui/joy";
import { DateTime } from "luxon";
import { useParams } from "react-router-dom";
import { WorkoutInfo } from "../../interfaces/workout-interfaces";
import { getWorkoutById } from "../../services/workout-service";
import { ViewSets } from "./set";
import { ViewSlice } from "./slice";

// export function ViewWorkout({ workoutId }: { workoutId: number }) {
export function ViewWorkout() {
  const id = +(useParams().id || "0");
  const workout: WorkoutInfo = getWorkoutById(id);
  const formattedDate = DateTime.fromMillis(
    Date.parse(workout.timestamp),
  ).toLocaleString();

  return (
    <Sheet
      sx={{
        maxWidth: "100%",
        maxHeight: "90%",
        overflow: "auto",
      }}
    >
      <Typography
        padding="0"
        top="0"
        level="h2"
        variant="soft"
        textAlign="center"
        margin="0"
      >
        {workout?.name}
      </Typography>
      <Typography
        padding="0"
        margin="0"
        level="h4"
        variant="soft"
        textAlign="center"
      >
        {formattedDate}
      </Typography>
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
        <ListItem>
          <ListItemButton
            variant="outlined"
            sx={{}}
            onClick={() => {
              alert("pressed");
            }}
          >
            <ListItemContent
              sx={{
                textAlign: "center",
                verticalAlign: "center",
              }}
            >
              <AddCircleIcon />
            </ListItemContent>
          </ListItemButton>
        </ListItem>
      </AccordionGroup>
    </Sheet>
  );
}
