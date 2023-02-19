import { CoursePart } from "./types";

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <>
      {courseParts.map((item, idx) => (
        <p key={idx}>
          {item.name} {item.exerciseCount}
        </p>
      ))}
    </>
  );
};

export default Content;
