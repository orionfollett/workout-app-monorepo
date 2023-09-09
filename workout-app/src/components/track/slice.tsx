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

  const repAverage =
    Math.round(reps.reduce((sum, curr) => sum + curr, 0) / reps.length) || 0;

  const weightAverage =
    Math.round(weights.reduce((sum, curr) => sum + curr, 0) / weights.length) ||
    0;

  return (
    <>
      <Accordion key={slice.id}>
        <AccordionSummary>
          {repAverage > 0 && weightAverage > 0 ? (
            <Typography level="title-md">
              {slice.exercise} - {reps.length} x {repAverage} @{weightAverage}
              lbs
            </Typography>
          ) : (
            <Typography level="title-md">{slice.exercise}</Typography>
          )}
        </AccordionSummary>
        <AccordionDetails>{slice.children}</AccordionDetails>
      </Accordion>
    </>
  );
}
