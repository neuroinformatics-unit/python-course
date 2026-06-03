import type { Course } from "./types";
import { assignmentsSupport } from "./curriculum/assignmentsSupport";
import { collectionsIndexing } from "./curriculum/collectionsIndexing";
import { controlFlow } from "./curriculum/controlFlow";
import { errorsObjectsStructure } from "./curriculum/errorsObjectsStructure";
import { functionsModules } from "./curriculum/functionsModules";
import { packagesNumpy } from "./curriculum/packagesNumpy";
import { pandasPlotting } from "./curriculum/pandasPlotting";
import { pythonFoundations } from "./curriculum/pythonFoundations";

export const courses: Course[] = [
  pythonFoundations,
  collectionsIndexing,
  functionsModules,
  controlFlow,
  packagesNumpy,
  pandasPlotting,
  errorsObjectsStructure,
  assignmentsSupport,
];

export const allLessons = courses.flatMap((course) =>
  course.lessons.map((lesson) => ({ ...lesson, courseId: course.id })),
);
