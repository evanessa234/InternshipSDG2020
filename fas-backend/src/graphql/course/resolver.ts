import { Query } from './course.query';
import { CourseMap} from "./course.map";
import { Mutation } from "./course.mutation";

export const resolver = {
  Query: Query,
  Course: CourseMap,
  Mutation: Mutation
};
