import { gql, useMutation, useQuery } from "urql";

const allExercisesQuery = gql`query GetAllExercises{allExercise{name}}`

export function getAllExercises(){
    return useQuery({query: allExercisesQuery})[0];
}

const addWorkoutMutation = gql`mutation AddWorkout($name: String){addWorkout(name: $name)}`

export function addWorkout(name:string){
    const [result, executeMutation] = useMutation(addWorkoutMutation);
    //executeMutation({name});
}