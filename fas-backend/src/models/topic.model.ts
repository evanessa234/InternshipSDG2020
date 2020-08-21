import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import { Course } from "./course.model";

@Table
export class Topic extends Model<Topic> {
  @ForeignKey(() => Course)
  @Column({ unique: "topic", allowNull: false })
  courseId: number;

  @BelongsTo(() => Course, {
    onDelete: "CASCADE",
  })
  course: Course;

  @Column({ unique: "topic", allowNull: false })
  chapterExpNumber: number;

  @Column
  chapterExpTopic: string;

  @Column
  coMeet: string;

  @Column
  chapterExpWeightage: number;
}
