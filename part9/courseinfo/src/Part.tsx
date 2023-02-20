import { CoursePart } from "./types";

const assertNever = (val: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(val)} `
  );
};

const Part = ({ course }: { course: CoursePart }) => {
  let content = <></>;

  switch (course.kind) {
    case "basic":
      content = (
        <>
          <h3>
            {course.name} {course.exerciseCount}
          </h3>
          <p>{course.description}</p>
        </>
      );
      break;
    case "group":
      content = (
        <>
          <h3>
            {course.name} {course.exerciseCount}
          </h3>
          <p>Project Exercises {course.groupProjectCount}</p>
        </>
      );
      break;
    case "background":
      content = (
        <>
          <h3>
            {course.name} {course.exerciseCount}
          </h3>
          <p>{course.description}</p>
          <p>{course.backroundMaterial}</p>
        </>
      );
      break;
    case "special":
      content = (
        <>
          <h3>
            {course.name} {course.exerciseCount}
          </h3>
          <p>{course.description}</p>
          <p>Required Skills: {course.requirements.join(", ")}</p>
        </>
      );
      break;
    default:
      assertNever(course);
      break;
  }

  return content;
};

export default Part;
