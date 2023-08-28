import { Query, gql, useMutation, useQuery } from "urql";

const allExercisesQuery = gql`
  query GetAllExercises {
    allExercise {
      name
    }
  }
`;

export function getAllExercises() {
  return useQuery({ query: allExercisesQuery })[0];
}
