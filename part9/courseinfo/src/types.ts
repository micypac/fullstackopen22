// export interface CoursePart {
//   name: string;
//   exerciseCount: number;
// }

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBaseWithDesc extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartBaseWithDesc {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackround extends CoursePartBaseWithDesc {
  backroundMaterial: string;
  kind: "background";
}

interface CoursePartRequirement extends CoursePartBaseWithDesc {
  requirements: string[];
  kind: "special";
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackround
  | CoursePartRequirement;
