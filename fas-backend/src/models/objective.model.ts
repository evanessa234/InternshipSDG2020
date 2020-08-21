import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import { Course } from "./course.model";

@Table
export class Objective extends Model<Objective> {
  @ForeignKey(() => Course)
  @Column({ unique: "objective", allowNull: false })
  courseId: number;

  @BelongsTo(() => Course, {
    onDelete: "CASCADE",
  })
  course: Course;

  @Column({ unique: "objective", allowNull: false })
  number: string;

  @Column
  name: string;
}
