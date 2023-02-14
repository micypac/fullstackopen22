export interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

function evaluateRating(rating: number): string {
  switch (rating) {
    case 3:
      return "Excellent job on working out";
    case 2:
      return "Not too bad but could be better";
    default:
      return "You gotta keep up on exercising";
  }
}

function parseArguments(args: string[]): number[] {
  const result: number[] = [];

  for (let i = 2; i < args.length; i++) {
    if (!isNaN(Number(args[i]))) {
      result.push(Number(args[i]));
    } else {
      throw new Error("Arguments provided is not a number.");
    }
  }

  return result;
}

export function calculateExercises(
  days: number[],
  target: number
): ExerciseResult {
  const result: ExerciseResult = {} as ExerciseResult;

  const totalHours = days.reduce((acc, val) => acc + val, 0);
  result.target = target;
  result.periodLength = days.length;
  result.trainingDays = days.filter((val) => val > 0).length;
  result.average = totalHours / days.length;
  result.success = result.average >= result.target;

  const ratingResult = (result.average / result.target) * 100;

  result.rating = ratingResult >= 100 ? 3 : ratingResult >= 50 ? 2 : 1;
  result.ratingDescription = evaluateRating(result.rating);

  return result;
}

// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
// console.log(calculateExercises([2, 1, 0, 2, 4.5, 0, 3, 1, 0], 4));

export function exerciseMain() {
  try {
    const parsedResult = parseArguments(process.argv);
    const days = parsedResult.slice(1);
    const target = parsedResult[0];

    console.log(calculateExercises(days, target));
  } catch (err) {
    let errMsg = "Something went wrong.";
    if (err instanceof Error) {
      errMsg += " Error: " + err.message;
    }
    console.log(errMsg);
  }
}

export {};
