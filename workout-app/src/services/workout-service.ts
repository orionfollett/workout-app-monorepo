import { gql, useQuery } from "urql";
import { SliceInfo, WorkoutInfo } from "../interfaces/workout-interfaces";

const allExercisesQuery = gql`
  query GetAllExercises {
    allExercise {
      name
    }
  }
`;

export function getAllExercises() {
  return genericGetRequest(allExercisesQuery);
}

const allWorkoutsQuery = gql`
  query {
    allWorkouts {
      name
      id
    }
  }
`;
export function getAllWorkoutNames(): { name: string; id: number }[] {
  const data = genericGetRequest(allWorkoutsQuery);
  if (data) {
    return data["allWorkouts"].map((x: any) => {
      return { name: x.name, id: x.id };
    });
  }
  return [];
}

const getWorkoutByIdQuery = gql`
  query GetWorkoutById($id: Int!) {
    workout(id: $id) {
      id
      name
      timestamp
      slices {
        id
        exercise {
          name
        }
        sets {
          weight
          reps
          id
        }
      }
    }
  }
`;
export function getWorkoutById(id: number): WorkoutInfo {
  const data = genericGetRequest(getWorkoutByIdQuery, { id: id });
  if (data) {
    const workout: WorkoutInfo = {
      id: data.workout.id,
      timestamp: data.workout.timestamp,
      name: data.workout.name,
      slices: data.workout.slices.map((s: any) => {
        return {
          exercise: s.exercise.name,
          id: s.id,
          sets: s.sets.map((set: any) => {
            return {
              id: set.id,
              weight: set.weight,
              reps: set.weight,
            };
          }),
        };
      }),
    };
    return workout;
  }
  return { name: "", slices: [], timestamp: "", id: -1 };
}

function genericGetRequest(query: any, variables?: any) {
  const { data, fetching, error } = useQuery({
    query: query,
    variables: variables,
  })[0];
  if (error) {
    console.error(error);
    return null;
  }
  return data;
}
