import { Typography } from "@mui/joy";
import { getAllExercises } from "../../services/workout-service";


export function Analyze(){

    const {data, fetching, error} = getAllExercises();
    let content:any;

    if(fetching) {
        content= <Typography>Loading...</Typography>
    }
    else if(error){
        content = <Typography>Error: {error?.message}</Typography>
    }
    else{
        content = data.allExercise.map((el:any) => <Typography key={el.name}>{el.name}</Typography>)
    }

    
    return <>
        <Typography level="h1">Analyze</Typography>
        {content}
    </>
}