import { Button, Typography } from "@mui/joy";
import { gql, useMutation } from "urql";
export function Track(){
    
    const addWorkoutMutation = gql`mutation AddWorkout($name: String!){addWorkout(name: $name)}`
    const [result, executeMutation] = useMutation(addWorkoutMutation);


    const submit = (newName: string) => {
        const variables = { name: newName};
        executeMutation(variables);        
    }

    return <>
        <Typography level="h1">Track</Typography>
        <Button onClick={() => submit("hello from react")}>New Workout</Button>
    </>
}