import express from "express";
const app = express();
import { calculateBMI } from "./bmiCalculator";

interface BMIResult {
  weight: number;
  height: number;
  bmi: string;
}

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  if (!isNaN(Number(req.query.weight)) && !isNaN(Number(req.query.height))) {
    let weight = Number(req.query.weight);
    let height = Number(req.query.height);

    const result: BMIResult = {
      weight,
      height,
      bmi: calculateBMI(height, weight),
    };

    res.json(result);
  } else {
    res.json({
      error: "malformatted query parameters.",
    });
  }
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
