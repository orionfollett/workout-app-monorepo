import { Typography } from "@mui/joy";
import { getAllExercises } from "../../services/workout-service";

export function Plan(){
    const {data, fetching, error} = getAllExercises();
    if(error){
        console.log(error);
    }
    const content = data?.allExercise.map((el:any) => <Typography key={el.name}>{el.name}</Typography>)
    return <>
        <Typography level="h1">Plan</Typography>
        {content}
    </>
}