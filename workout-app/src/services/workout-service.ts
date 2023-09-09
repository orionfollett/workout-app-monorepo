import { gql, useMutation, useQuery } from "urql";
import { WorkoutInfo } from "../interfaces/workout-interfaces";

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
export function getAllWorkoutNames(): [{ name: string; id: number }[], any] {
  try {
    const [data, refresh] = genericGetRequest(allWorkoutsQuery);
    if (data) {
      return [
        data["allWorkouts"].map((x: any) => {
          return { name: x.name, id: x.id };
        }),
        refresh,
      ];
    }
    return [[], () => {}];
  } catch (e) {
    return [[], null];
  }
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
  try {
    const [data, refresh] = genericGetRequest(getWorkoutByIdQuery, { id: id });
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
              reps: set.reps,
            };
          }),
        };
      }),
    };

    return workout;
  } catch (e) {
    return { name: "", slices: [], timestamp: "", id: -1 };
  }
}

const addWorkoutMutation = gql`
  mutation AddWorkout($name: String!) {
    addWorkout(name: $name)
  }
`;
export function addWorkoutBuilder() {
  const [result, executeMutation] = useMutation(addWorkoutMutation);
  const executeAddWorkout = (newName: string) => {
    const variables = { name: newName };
    executeMutation(variables);
  };

  return executeAddWorkout;
}

function genericGetRequest(query: any, variables?: any) {
  const [result, reexecuteQuery] = useQuery({
    query: query,
    variables: variables,
  });
  const { data, fetching, error } = result;
  if (error) {
    console.error(error);
    throw error;
  }
  const refresh = () => {
    // Refetch the query and skip the cache
    reexecuteQuery({ requestPolicy: "network-only" });
  };
  return [data, refresh];
}
