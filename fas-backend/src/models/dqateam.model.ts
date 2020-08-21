import {
    Table,
    Column,
    Model,
    BelongsTo,
    ForeignKey,
  } from "sequelize-typescript";
  import { Course } from "./course.model";
  
  @Table
  export class DqaTeam extends Model<DqaTeam> {
    
    @Column({ unique: "dqateam", allowNull: false })
    courseId: number;
 
    @Column
    btLevel: number;
    
    @Column
    grammar: number;

    @Column
    coComment: string;
    
    @Column
    properDistributionMap: number;
    
    @Column
    commentMap: string;

    @Column
    syllabusCoverage: number;

    @Column
    coWeightage: number;

    @Column
    chapterExpWeightage: number;

    @Column
    commentWeightage: string;
    
    @Column
    coCoverageAssMethod: number;
    
    @Column
    marksDistribution: number;

    @Column
    questionQuality: string;

    @Column
    commentAssMethod: string;
    
    @Column
    typeOfExp: string;

    @Column
    timeJustified: number;
    
    @Column
    modernToolsUsed: number;

    @Column
    outOfSyllabus: number;

  }



  