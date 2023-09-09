import {
  Autocomplete,
  Button,
  ListItem,
  ListItemButton,
  ListItemContent,
} from "@mui/joy";
import {
  addSliceBuilder,
  getAllExercises,
} from "../../services/workout-service";
import { useState } from "react";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export function CreateSlice(props: any) {
  const [exercises, refreshExercises] = getAllExercises();
  const [selectedExercise, setIsSelectedExercise] = useState({
    name: "",
    id: -1,
  });
  const executeAddSlice = addSliceBuilder();
  const [isAddSlice, setIsAddSlice] = useState(false);
  return (
    <>
      <ListItem>
        <ListItemButton
          variant="outlined"
          sx={{}}
          onClick={() => {
            setIsAddSlice(!isAddSlice);
          }}
        >
          <ListItemContent
            sx={{
              textAlign: "center",
              verticalAlign: "center",
            }}
          >
            {!isAddSlice && <AddCircleIcon />}
            {isAddSlice && <DoDisturbOnIcon />}
          </ListItemContent>
        </ListItemButton>
      </ListItem>
      {isAddSlice && (
        <>
          <Autocomplete
            placeholder="Select an exercise to add"
            options={exercises.map((e) => {
              return e.name;
            })}
            onBlur={(event: any) => {
              const exerciseSelection = exercises.find(
                (el) => el.name == event.target.value,
              );
              exerciseSelection
                ? setIsSelectedExercise(exerciseSelection)
                : undefined;
            }}
          />

          <Button
            onClick={() => {
              executeAddSlice(props.workoutId, selectedExercise.id);
              props.refreshWorkout();
              setIsAddSlice(!isAddSlice);
            }}
          >
            Add Exercise
          </Button>
        </>
      )}
    </>
  );
}
