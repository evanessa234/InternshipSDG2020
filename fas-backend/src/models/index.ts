import { Sequelize } from "sequelize-typescript";
import { ENV } from "../config/env.config";

export const sequelize = new Sequelize({
  host: ENV.DB_HOST,
  database: ENV.DB_NAME,
  port: +ENV.DB_PORT,
  dialect: ENV.DB_DIALECT,
  username: ENV.DB_USER,
  password: ENV.DB_PASSWORD,
  operatorsAliases: false,
  logging: false,
  storage: ":memory:",
  modelPaths: [__dirname + "/*.model.ts"],
  modelMatch: (filename, member) => {
    return (
      filename.substring(0, filename.indexOf(".model")) === member.toLowerCase()
    );
  },
});
export { User } from "./user.model";
export { Course } from "./course.model";
export { Objective } from "./objective.model";
export { Outcome } from "./outcome.model";
export { Topic } from "./topic.model";
export { CoPoMapping } from "./copomapping.model";
export { CoPsoMapping } from "./copsomapping.model";
export { LessonPlan } from "./lessonplan.model";
export { ProgramOutcome } from "./programoutcome.model";
export { ProgramSpecificOutcome } from "./programspecificoutcome.model";
export { AssessmentMethod } from "./assessmentmethod.model";
export { DqaTeam } from "./dqateam.model";
