import { gql, useMutation, useQuery } from "urql";
import { WorkoutInfo } from "../interfaces/workout-interfaces";

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
    return [[], () => {}];
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
export function getWorkoutById(id: number): [WorkoutInfo | undefined, any] {
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

    return [workout, refresh];
  } catch (e) {
    return [undefined, () => {}];
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

const addSliceMutation = gql`
  mutation AddSlice($workoutId: Int!, $exerciseId: Int!) {
    addSlice(workout_id: $workoutId, exercise_id: $exerciseId)
  }
`;
export function addSliceBuilder() {
  const [result, executeMutation] = useMutation(addSliceMutation);
  const executeAddSlice = (workoutId: number, exerciseId: number) => {
    const variables = { workoutId: workoutId, exerciseId: exerciseId };
    executeMutation(variables);
  };

  return executeAddSlice;
}

const allExercises = gql`
  query {
    allExercise {
      id
      name
    }
  }
`;

export function getAllExercises(): [{ id: number; name: string }[], any] {
  try {
    const [data, refresh] = genericGetRequest(allExercises);
    return [
      data.allExercise.map((exercise: any) => {
        return { id: exercise.id, name: exercise.name };
      }),
      refresh,
    ];
  } catch (e) {
    return [[], () => {}];
  }
}

const addSetMutation = gql`
  mutation AddSet($sliceId: Int!, $reps: Int!, $weight: Float!) {
    addSet(slice_id: $sliceId, reps: $reps, weight: $weight)
  }
`;
export function addSetBuilder() {
  const [result, executeMutation] = useMutation(addSetMutation);
  const executeAddSet = (sliceId: number, reps: number, weight: number) => {
    const variables = { sliceId: sliceId, reps: reps, weight: weight };
    executeMutation(variables);
  };

  return executeAddSet;
}
