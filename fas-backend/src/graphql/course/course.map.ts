import { resolver } from 'graphql-sequelize';
import { Course, DqaTeam } from '../../models';

export const CourseMap = {
    objectives: resolver(Course.associations.objectives),
    outcomes: resolver(Course.associations.outcomes),
    topics: resolver(Course.associations.topics),
    coPoMappings: resolver(Course.associations.coPoMappings),
    coPsoMappings: resolver(Course.associations.coPsoMappings),
    lessonPlans: resolver(Course.associations.lessonPlans),
    programOutcomes: resolver(Course.associations.programOutcomes),
    programSpecificOutcomes: resolver(Course.associations.programSpecificOutcomes),
    assessmentMethods: resolver(Course.associations.assessmentMethods),

};

