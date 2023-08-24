import { Typography } from "@mui/joy";

import { gql, useQuery } from "urql";

const testQuery = gql`query{allExercise{name}}`


export function Analyze(){
    const [result, reexecuteQuery] = useQuery({query: testQuery});
    const {data, fetching, error} = result;
    let content:any;
    const test = <Typography>Loading...</Typography>;
    if(fetching) {
        content= <Typography>Loading...</Typography>
    }
    else if(error){
        content = <Typography>Error: {error?.message}</Typography>
    }
    else{
        content = data.allExercise.map((el:any) => <Typography>{el.name}</Typography>)
    }

    
    return <>
        <Typography level="h1">Analyze</Typography>
        {content}
    </>
}