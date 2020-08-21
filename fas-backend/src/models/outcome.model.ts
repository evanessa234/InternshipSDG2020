import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
  HasOne,
} from "sequelize-typescript";
import { Course } from "./course.model";
import { Objective } from "./objective.model";
@Table
export class Outcome extends Model<Outcome> {
  @ForeignKey(() => Course)
  @Column({ unique: "outcome", allowNull: false })
  courseId: number;

  @BelongsTo(() => Course, {
    onDelete: "CASCADE",
  })
  course: Course;

  @Column({ unique: "outcome", allowNull: false })
  number: string;

  @Column
  name: string;

  @Column
  weightagePercent: number;

  @Column
  durationHours: number;

  @Column
  numberOfExp: number;
}
