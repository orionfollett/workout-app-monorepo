import { Box, Chip } from "@mui/joy";
import { SetInfo } from "../../interfaces/workout-interfaces";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { addSetBuilder } from "../../services/workout-service";
export interface SetsInfo {
  sets: SetInfo[];
}

export function ViewSets(props: any) {
  const executeAddSet = addSetBuilder();
  console.log(props);
  return (
    <>
      <Box
        sx={{ display: "flex", gap: 1, alignItems: "center", flexWrap: "wrap" }}
      >
        {props.sets.map((set: SetInfo) => {
          return (
            <Chip
              color="neutral"
              onClick={function () {}}
              size="md"
              variant="outlined"
              key={set.id}
            >
              {set.reps} reps @ {set.weight} lbs
            </Chip>
          );
        })}
        <Chip
          color="neutral"
          onClick={() => {
            executeAddSet(props.sliceId, 1, 1);
            props.refreshSets();
          }}
          size="md"
          variant="outlined"
          key={-1}
        >
          <AddCircleIcon></AddCircleIcon>
        </Chip>
      </Box>
    </>
  );
}
