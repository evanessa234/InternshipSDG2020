import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import { Course } from "./course.model";

@Table
export class AssessmentMethod extends Model<AssessmentMethod> {
  @ForeignKey(() => Course)
  @Column({ unique: "asses", allowNull: false })
  courseId: number;

  @BelongsTo(() => Course, {
    onDelete: "CASCADE",
  })
  course: Course;

  @Column
  number: number;

  @Column({ unique: "asses", allowNull: false })
  method: string;

  @Column({ unique: "asses", allowNull: false })
  coMeet: string;

  @Column
  marks: number;
}
