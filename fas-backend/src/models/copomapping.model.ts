import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import { Course } from "./course.model";

@Table
export class CoPoMapping extends Model<CoPoMapping> {
  @ForeignKey(() => Course)
  @Column({ unique: "copo", allowNull: false })
  courseId: number;

  @BelongsTo(() => Course, {
    onDelete: "CASCADE",
  })
  course: Course;

  @Column({ unique: "copo", allowNull: false })
  coNumber: string;

  @Column({ unique: "copo", allowNull: false })
  poNumber: string;

  @Column
  rating: number;
}
