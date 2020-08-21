import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import { Course } from "./course.model";
@Table
export class ProgramSpecificOutcome extends Model<ProgramSpecificOutcome> {
  @ForeignKey(() => Course)
  @Column({ unique: "progspecific", allowNull: false })
  courseId: number;

  @BelongsTo(() => Course, {
    onDelete: "CASCADE",
  })
  course: Course;

  @Column({ unique: "progspecific", allowNull: false })
  number: string;

  @Column
  description: string;
}
