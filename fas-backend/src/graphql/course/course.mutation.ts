import { resolver as rs } from "graphql-sequelize";
import {
  Course,
  Objective,
  Outcome,
  Topic,
  CoPoMapping,
  CoPsoMapping,
  LessonPlan,
  ProgramOutcome,
  ProgramSpecificOutcome,
  AssessmentMethod,
  User,
  sequelize,
  DqaTeam
} from "../../models";
import to from "await-to-js";
import { updateItem } from "./utils/mutation.utils";


export const Mutation = {
  createCourse: rs(Course, {
    before: async (findOptions, { data }) => {
      let err, course;

      [err, course] = await to(
        Course.create(data, {
          include: [
            Objective,
            Outcome,
            Topic,
            CoPsoMapping,
            CoPoMapping,
            LessonPlan,
            ProgramOutcome,
            ProgramSpecificOutcome,
            AssessmentMethod,
          ] as any,
        })
      );
      findOptions.where = { id: course.id };
      return findOptions;
      if (err) {
        throw err;
      }
    },
    after: (course) => {
      return course;
    },
  }),

  updateCourse: rs(Course, {
    before: async (findOptions, { id, data }) => {
      await updateItem(id, data);
      findOptions.where = { id: id };
      return findOptions;
    },
    after: (course) => {
      return course;
    },
    
  }),
  dqaApprove: rs(Course, {
    before: async (findOptions, { id }) => {
      let err, course;

      [err, course] = await to(
        Course.update({ dqaApproved: 1 }, { where: { id } })
      );

      if (err) {
        throw err;
      }
    },
    after: (course) => {
      return course;
    },
  }),
  dqaDisApprove: rs(Course, {
    before: async (findOptions, { id }) => {
      let err, course;

      [err, course] = await to(
        Course.update({ dqaApproved: null }, { where: { id } })
      );

      if (err) {
        throw err;
      }
    },
    after: (course) => {
      return course;
    },
  }),

  submit: rs(Course, {
    before: async (findOptions, { id, sdrn }) => {
      let err, course;

      [err, course] = await to(
        Course.update({ submitBy: sdrn }, { where: { id } })
      );

      if (err) {
        throw err;
      }

      findOptions.where = { id: id };
      return findOptions;
    },
    after: (course) => {
      return course;
    },
  }),

  delete: rs(Course, {
    before: async (findOptions, { id }) => {
      let err, course;

      [err, course] = await to(Course.destroy({ where: { id } }));

      if (err) {
        throw err;
      }
    },
    after: (course) => {
      return course;
    },
  }),

  hodApprove: rs(Course, {
    before: async (findOptions, { id }) => {
      let err, course;

      [err, course] = await to(
        Course.update({ hodApproved: 1 }, { where: { id } })
      );

      if (err) {
        throw err;
      }
    },
    after: (course) => {
      return course;
    },
  }),

  hodDisApprove: rs(Course, {
    before: async (findOptions, { id }) => {
      let err, course;

      [err, course] = await to(
        Course.update({ hodApproved: null }, { where: { id } })
      );

      if (err) {
        throw err;
      }
    },
    after: (course) => {
      return course;
    },
  }),

  hodComment: rs(Course, {
    before: async (findOptions, { id, comment }) => {
      let err, course;

      [err, course] = await to(
        Course.update({ hodComment: comment }, { where: { id } })
      );

      if (err) {
        throw err;
      }
    },
    after: (course) => {
      return course;
    },
  }),

  audit: rs(DqaTeam, {
    before: async (findOptions, { id, data }) => {
      let err, course;

      [err, course] = await to(
        DqaTeam.create({ courseId: id, ...data })
      );
      if (err) {
        throw err;
      }
    },
    after: (course) => {
      return course;
    },
  }),

  updateAudit: rs(DqaTeam, {
    before: async (findOptions, { id, data }) => {
      let err, course;

      [err, course] = await to(
        DqaTeam.update(data, { where: { courseId: id } })
      );
      if (err) {
        throw err;
      }
      findOptions.where = { courseId: id };
      return findOptions;
    },
    after: (audit) => {
      return audit;
    },
  }),

  deleteAudit: rs(DqaTeam, {
    before: async (findOptions, { id, data }) => {
      let err, course;

      [err, course] = await to(
        DqaTeam.destroy({ where: { courseId: id } })
      );
      if (err) {
        throw err;
      }
    },
    after: (audit) => {
      return audit;
    },
  }),
};
