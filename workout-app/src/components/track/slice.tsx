import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/joy";
import { SliceInfo } from "../../interfaces/workout-interfaces";
import { PropsWithChildren } from "react";

export function ViewSlice(slice: PropsWithChildren<SliceInfo>) {
  const reps: number[] = slice.sets.map((x) => x.reps);
  const weights: number[] = slice.sets.map((x) => x.weight);

  const repAverage = Math.round(
    reps.reduce((sum, curr) => sum + curr) / reps.length,
  );

  const weightAverage = Math.round(
    weights.reduce((sum, curr) => sum + curr) / weights.length,
  );

  return (
    <>
      <Accordion>
        <AccordionSummary>
          <Typography level="title-md">
            {slice.exercise} - {reps.length} x {repAverage} @{weightAverage}
            lbs
          </Typography>
        </AccordionSummary>
        <AccordionDetails>{slice.children}</AccordionDetails>
      </Accordion>
    </>
  );
}
