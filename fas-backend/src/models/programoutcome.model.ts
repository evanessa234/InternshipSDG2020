import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import { Course } from "./course.model";
@Table
export class ProgramOutcome extends Model<ProgramOutcome> {
  @ForeignKey(() => Course)
  @Column({ unique: "progoutcome", allowNull: false })
  courseId: number;

  @BelongsTo(() => Course, {
    onDelete: "CASCADE",
  })
  course: Course;

  @Column({ unique: "progoutcome", allowNull: false })
  number: string;

  @Column
  title: string;

  @Column
  description: string;
}
