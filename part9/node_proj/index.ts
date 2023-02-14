import express from "express";
const app = express();
import { calculateBMI } from "./bmiCalculator";
import { ExerciseResult, calculateExercises } from "./exerciseCalculator";

app.use(express.json());

interface BMIResult {
  weight: number;
  height: number;
  bmi: string;
}

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.post("/exercises", (req, res) => {
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    res.status(400).json({ error: "parameters missing" });
  }

  if (Array.isArray(daily_exercises) && !isNaN(Number(target))) {
    const result: ExerciseResult = calculateExercises(daily_exercises, target);
    res.json(result);
  } else {
    res.status(400).json({ error: "malformatted parameters" });
  }

  console.log(typeof daily_exercises);
  console.log(typeof target);
});

app.get("/bmi", (req, res) => {
  if (!isNaN(Number(req.query.weight)) && !isNaN(Number(req.query.height))) {
    const weight = Number(req.query.weight);
    const height = Number(req.query.height);

    const result: BMIResult = {
      weight,
      height,
      bmi: calculateBMI(height, weight),
    };

    res.json(result);
  } else {
    res.status(400).json({
      error: "malformatted query parameters.",
    });
  }
});

const port = 3002;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
