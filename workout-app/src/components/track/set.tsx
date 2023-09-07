import { Box, Chip } from "@mui/joy";
import { SetInfo } from "../../interfaces/workout-interfaces";

export interface SetsInfo {
  sets: SetInfo[];
}

export function ViewSets(sets: SetsInfo) {
  return (
    <>
      <Box
        sx={{ display: "flex", gap: 1, alignItems: "center", flexWrap: "wrap" }}
      >
        {sets.sets.map((set) => {
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
      </Box>
    </>
  );
}
