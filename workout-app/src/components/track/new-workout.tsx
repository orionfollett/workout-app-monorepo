import { Button } from "@mui/base";
import Input from "@mui/joy/Input";
import { useState } from "react";
import { addWorkoutBuilder } from "../../services/workout-service";

export function CreateWorkout(props: any) {
  const executeAddWorkout = addWorkoutBuilder();
  const [workoutName, setWorkoutName] = useState("");
  return (
    <>
      <Input
        onBlur={(event) => {
          setWorkoutName(event.target.value);
        }}
        placeholder="Enter name of workout"
        variant="outlined"
      />
      <Button
        onClick={() => {
          executeAddWorkout(workoutName);
          props.refreshWorkouts();
        }}
      >
        New Workout
      </Button>
    </>
  );
}
