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
  } from "../../../models";

export async function updateItem(id: number, data) {
    const course = await Course.findOne({
      where: { id },
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
    });
  
    if (!course) {
      throw new Error("course not found");
    }
  
    // Get deltas
    const objectiveDelta = getDelta(course.objectives, data.objectives);
    const outcomeDelta = getDelta(course.outcomes, data.outcomes);
    const topicDelta = getDelta(course.topics, data.topics);
    const coPoMappingDelta = getDelta(course.coPoMappings, data.coPoMappings);
    const coPsoMappingDelta = getDelta(course.coPsoMappings, data.coPsoMappings);
    const lessonPlanDelta = getDelta(course.lessonPlans, data.lessonPlans);
    const programSpecificOutcomeDelta = getDelta(
      course.programSpecificOutcomes,
      data.programSpecificOutcomes
    );
    const programOutcomeDelta = getDelta(
      course.programOutcomes,
      data.programOutcomes
    );
    const assessmentMethodDelta = getDelta(
      course.assessmentMethods,
      data.assessmentMethods
    );
  
    await sequelize
      .transaction(async (transaction) => {
        await fooDo(
          { delta: objectiveDelta, name: "objective" },
          course,
          transaction
        );
  
        await fooDo(
          { delta: outcomeDelta, name: "outcome" },
          course,
          transaction
        );
  
        await fooDo({ delta: topicDelta, name: "topic" }, course, transaction);
  
        await fooDo(
          { delta: coPoMappingDelta, name: "coPoMapping" },
          course,
          transaction
        );
  
        await fooDo(
          { delta: coPsoMappingDelta, name: "coPsoMapping" },
          course,
          transaction
        );
  
        await fooDo(
          { delta: lessonPlanDelta, name: "lessonPlan" },
          course,
          transaction
        );
  
        await fooDo(
          { delta: programSpecificOutcomeDelta, name: "programSpecificOutcome" },
          course,
          transaction
        );
  
        await fooDo(
          { delta: programOutcomeDelta, name: "programOutcome" },
          course,
          transaction
        );
  
        await fooDo(
          { delta: assessmentMethodDelta, name: "assessmentMethod" },
          course,
          transaction
        );
  
        return course.update(data, { transaction });
      })
      .then((course) =>
        Course.findById(course.id, {
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
      )
      .then((value) => value);
  }
  
  function getDelta(source, updated) {
    let added = updated.filter(
      (updatedItem) =>
        source.find((sourceItem) => sourceItem.id === updatedItem.id) ===
        undefined
    );
    let changed = source.filter(
      (sourceItem) =>
        updated.find((updatedItem) => updatedItem.id === sourceItem.id) !==
        undefined
    );
    let deleted = source.filter(
      (sourceItem) =>
        updated.find((updatedItem) => updatedItem.id === sourceItem.id) ===
        undefined
    );
  
    const delta = {
      added: added,
      changed: changed,
      deleted: deleted,
    };
  
    return delta;
  }
  
  async function fooDo(fooValue, model, transaction) {
    await Promise.all([
      ...fooValue.delta.added.map(async (foo) =>
        model.$create(fooValue.name, foo, { transaction })
      ),
      ...fooValue.delta.changed.map(async (fooData) => {
        const foo = model.foos.find((_foo) => _foo.id == fooData.id);
        return foo.update(fooData, { transaction });
      }),
      ...fooValue.delta.deleted.map(async (foo) => foo.destroy({ transaction })),
    ]);
  }