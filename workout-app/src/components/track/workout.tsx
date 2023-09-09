import { AccordionGroup, Sheet, Typography } from "@mui/joy";
import { DateTime } from "luxon";
import { useParams } from "react-router-dom";
import { getWorkoutById } from "../../services/workout-service";
import { CreateSlice } from "./new-slice";
import { ViewSets } from "./set";
import { ViewSlice } from "./slice";

export function ViewWorkout() {
  const id = +(useParams().id || "0");
  const [workout, refreshWorkout] = getWorkoutById(id);
  const isApiError = workout == undefined;
  const formattedDate = DateTime.fromMillis(
    Date.parse(workout?.timestamp || ""),
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
                <ViewSets
                  sets={slice.sets}
                  sliceId={slice.id}
                  refreshSets={refreshWorkout}
                ></ViewSets>
              </ViewSlice>
            </div>
          );
        })}
        <CreateSlice
          workoutId={id}
          refreshWorkout={refreshWorkout}
        ></CreateSlice>
      </AccordionGroup>
    </Sheet>
  );
}
