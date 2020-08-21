import { Table, Column, Model, HasMany, HasOne } from "sequelize-typescript";
import { Objective } from "./objective.model";
import { Outcome } from "./outcome.model";
import { Topic } from "./topic.model";
import { CoPoMapping } from "./copomapping.model";
import { CoPsoMapping } from "./copsomapping.model";
import { LessonPlan } from "./lessonplan.model";
import { ProgramOutcome } from "./programoutcome.model";
import { ProgramSpecificOutcome } from "./programspecificoutcome.model";
import { AssessmentMethod } from "./assessmentmethod.model";
import { DqaTeam } from "./dqateam.model";

@Table({ timestamps: true })
export class Course extends Model<Course> {
  @Column({ autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ unique: "course", allowNull: false })
  from: number;

  @Column({ unique: "course", allowNull: false })
  to: number;

  @Column({ unique: "course", allowNull: false })
  sem: number;

  @Column({ unique: "course", allowNull: false })
  subjectCode: string;

  @Column
  name: string;

  @Column
  credits: number;

  @Column
  lectHours: number;

  @Column
  toLectHours: number;

  @Column
  practHours: number;

  @Column
  toPractHours: number;

  @Column
  submitBy: number;

  @Column
  submitTime: Date;

  @Column
  dqaApproved: number;

  @Column
  hodApproved: number;

  @Column
  hodComment: string;

  @Column
  hodCommentTime: Date;

  @HasMany(() => Objective)
  objectives: Objective[];

  @HasMany(() => Outcome, {
    onDelete: "CASCADE",
  })
  outcomes: Outcome[];

  @HasMany(() => Topic, {
    onDelete: "CASCADE",
  })
  topics: Topic[];

  @HasMany(() => CoPoMapping, {
    onDelete: "CASCADE",
  })
  coPoMappings: CoPoMapping[];

  @HasMany(() => CoPsoMapping, {
    onDelete: "CASCADE",
  })
  coPsoMappings: CoPsoMapping[];

  @HasMany(() => LessonPlan, {
    onDelete: "CASCADE",
  })
  lessonPlans: LessonPlan[];

  @HasMany(() => ProgramOutcome, {
    onDelete: "CASCADE",
  })
  programOutcomes: ProgramOutcome[];

  @HasMany(() => ProgramSpecificOutcome, {
    onDelete: "CASCADE",
  })
  programSpecificOutcomes: ProgramSpecificOutcome[];

  @HasMany(() => AssessmentMethod, {
    onDelete: "CASCADE",
  })
  assessmentMethods: AssessmentMethod[];


}
