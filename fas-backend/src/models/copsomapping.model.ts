import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import { Course } from "./course.model";
@Table
export class CoPsoMapping extends Model<CoPsoMapping> {
  @ForeignKey(() => Course)
  @Column({ unique: "copso", allowNull: false })
  courseId: number;

  @BelongsTo(() => Course, {
    onDelete: "CASCADE",
  })
  course: Course;

  @Column({ unique: "copso", allowNull: false })
  coNumber: string;

  @Column({ unique: "copso", allowNull: false })
  poNumber: string;

  @Column
  rating: number;
}
