import { Typography } from "@mui/joy";
import { getAllExercises } from "../../services/workout-service";

export function Analyze() {
  const data = getAllExercises();
  let content: any;

  if (data) {
    content = data.allExercise.map((el: any) => (
      <Typography key={el.name}>{el.name}</Typography>
    ));
  }

  return (
    <>
      <Typography level="h1">Analyze</Typography>
      {content}
    </>
  );
}
