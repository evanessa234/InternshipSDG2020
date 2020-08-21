import { resolver } from "graphql-sequelize";
import { Course, DqaTeam } from "../../models";

export const Query = {
  courses: resolver(Course, {
    before: async (findOptions) => findOptions,

    after: (course) => {
      return course;
    },
  }),

  course: resolver(Course, {
    before: async (findOption, { id }) => {
      findOption.where = { id: id };
      return findOption;
    },
    after: (course) => {
      return course;
    },
  }),

  getAudit: resolver(DqaTeam, {
    before: async (findOption, { id }) => {
      findOption.where = { courseId: id };
      return findOption;
    },
    after: (audit) => {
      return audit;
    },
  }),
};
