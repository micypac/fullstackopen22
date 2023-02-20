import { CoursePart } from "./types";
import Part from "./Part";

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <>
      {courseParts.map((item, idx) => (
        <Part key={idx} course={item} />
      ))}
    </>
  );
};

export default Content;
