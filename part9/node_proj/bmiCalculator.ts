interface ValidArgs {
  val1: number;
  val2: number;
}

const parseArguments = (args: string[]): ValidArgs => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      val1: Number(args[2]),
      val2: Number(args[3]),
    };
  } else {
    throw new Error("Arguments provided is not a number");
  }
};

const calculateBMI = (height: number, weight: number): string => {
  let heightSquare: number = (height / 100) ** 2;
  let result: number = weight / heightSquare;

  if (result < 16) {
    return `Severe Thinness`;
  } else if (result >= 16 && result <= 17) {
    return `Moderate Thinness`;
  } else if (result > 17 && result <= 18.5) {
    return `Mild Thinness`;
  } else if (result > 18.5 && result <= 25) {
    return `Normal (Healthy Weight)`;
  } else if (result > 25 && result <= 30) {
    return `Overweight`;
  } else if (result > 30 && result <= 35) {
    return `Obese Class I`;
  } else if (result > 35 && result <= 40) {
    return `Obese Class II`;
  } else {
    return `Obese Class III`;
  }
};

// console.log(calculateBMI(180, 74));

try {
  const { val1, val2 } = parseArguments(process.argv);
  console.log(calculateBMI(val1, val2));
} catch (err) {
  let errorMsg = "Something went wrong.";
  if (err instanceof Error) {
    errorMsg += " Error: " + err.message;
  }

  console.log(errorMsg);
}
