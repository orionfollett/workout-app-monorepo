import { Accordion, AccordionDetails, AccordionSummary } from "@mui/joy";

export interface SliceInfo {
  exercise: string;
  reps: number[];
  weight: number[];
}
export function ViewSlice(slice: SliceInfo) {
  const repAverage = Math.round(
    slice.reps.reduce((sum, curr) => sum + curr) / slice.reps.length,
  );

  const weightAverage = Math.round(
    slice.weight.reduce((sum, curr) => sum + curr) / slice.weight.length,
  );
  return (
    <>
      <Accordion>
        <AccordionSummary>
          {slice.exercise} - {slice.reps.length} x {repAverage} @{weightAverage}
          lbs
        </AccordionSummary>
        <AccordionDetails>Sets go here</AccordionDetails>
      </Accordion>
    </>
  );
}
