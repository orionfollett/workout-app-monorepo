import { gql, useQuery } from "urql";

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

const allWorkoutsQuery = gql`
  query {
    allWorkouts {
      name
    }
  }
`;
export function getAllWorkoutNames(): string[] {
  const data = genericGetRequest(allWorkoutsQuery);
  if (data) {
    return data["allWorkouts"].map((x: any) => x.name);
  }
  return [];
}

function genericGetRequest(query: any) {
  const { data, fetching, error } = useQuery({ query: query })[0];
  if (error) {
    console.log(error);
    return null;
  }
  return data;
}
