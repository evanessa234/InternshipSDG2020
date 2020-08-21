import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import { Course } from "./course.model";
@Table
export class LessonPlan extends Model<LessonPlan> {
  @ForeignKey(() => Course)
  @Column({ unique: "lessonplans", allowNull: false })
  courseId: number;

  @BelongsTo(() => Course, {
    onDelete: "CASCADE",
  })
  course: Course;

  @Column({ unique: "lessonplans", allowNull: false })
  weekNumber: number;

  @Column({ unique: "lessonplans", allowNull: false })
  lectureNumber: number;

  @Column
  subTopics: string;

  @Column
  coMeet: string;

  @Column
  weightage: number;

  @Column
  teachingMethod: string;
}
