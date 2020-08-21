<script>
  import LabOrClass from "../components/formcomponents/LabOrClass.svelte";
  import Title from "../components/formcomponents/Title.svelte";
  import Divider from "../components/Divider.svelte";
  import AuditDetails from "../components/AuditDetails.svelte";

  import CourseDetails from "../components/formcomponents/CourseDetails.svelte";
  import CourseObjectives from "../components/formcomponents/CourseObjectives.svelte";
  import CourseOutcomes from "../components/formcomponents/CourseOutcomes.svelte";
  import ProgramOutcomes from "../components/formcomponents/ProgramOutcomes.svelte";
  import CoPoMappings from "../components/formcomponents/CoPoMappings.svelte";
  import CoPsoMappings from "../components/formcomponents/CoPsoMappings.svelte";
  import ProgramSpecificOutcome from "../components/formcomponents/ProgramSpecificOutcome.svelte";
  import Topic from "../components/formcomponents/Topic.svelte";
  import LessonPlan from "../components/formcomponents/LessonPlan.svelte";
  import AssessmentMethod from "../components/formcomponents/AssessmentMethod.svelte";
  import { getClient, query, mutate } from "svelte-apollo";
  import { navigate } from "svelte-routing";
  import { text } from "svelte/internal";
  import { courseStore, isLab } from "../scripts/store";
  import {
    GETCOURSE,
    CREATECOURSE,
    UPDATECOURSE,
    SUBMITCOURSE
  } from "../scripts/data";
  import { onDestroy } from "svelte";
  import removeTypename from "@naveen-bharathi/remove-graphql-typename";

  export let id;
  export let action;
  console.log(id);
  const client = getClient();
  let unsubCourse;
  let course;
  onDestroy(() => {
    courseStore.set({});
    unsubCourse;
  });
  course = query(client, {
    query: GETCOURSE,
    variables: {
      id: id
    }
  });
  unsubCourse = course.subscribe(async value => {
    let result = await value;
    courseStore.set(removeTypename(result.data.course));
    isLab.set($courseStore.practHours ? true : false);
  });

  async function saveCourse() {
    let course;
    let courseId;
    let araara = $courseStore;

    if ($isLab && !$courseStore.practHours) {
      alert("Practical Hours cannot be empty!");
    } else if (!$isLab && !$courseStore.lectHours) {
      alert("Lecture Hours cannot be empty!");
    } else {
      alert("saved!");

      try {
        delete araara.submitBy;
        delete araara.submitTime;
        delete araara.dqaApproved;
        delete araara.hodApproved;
        delete araara.hodComment;
        delete araara.hodCommentTime;
      } catch (e) {
        console.log(e);
      }
      if (action === "create") {
        course = await mutate(client, {
          mutation: CREATECOURSE,
          variables: {
            data: araara
          }
        });
        courseId = course.data.createCourse.id;
      } else if (action === "edit" && id) {
        course = await mutate(client, {
          mutation: UPDATECOURSE,
          variables: {
            id: id,
            data: araara
          }
        });

        courseId = course.data.updateCourse.id;
        await navigate(`/course/edit/${courseId}`, { replace: true });
        location.reload();
      }
    }
  }

  async function submitCourse() {
    let res = await mutate(client, {
      mutation: SUBMITCOURSE,
      variables: {
        id: id
      }
    });

    console.log(res.data);

    await navigate(`/`, { replace: true });
  }
</script>

<form on:submit|preventDefault>
  {#await $course}
    ..loading
  {:then result}

    <div
      class="flex p-2 justify-between md:flex-row flex-col bg-red-400 h-12" />

    <LabOrClass />
    <Divider />

    <Title text={'Enter Course Details:'} />
    <CourseDetails />

    <Title text={'Enter Course Objectives:'} />
    <CourseObjectives />

    <Title text={'Enter Course Outcomes:'} />

    <CourseOutcomes />

    <Title text={'Enter Program Outcomes:'} />
    <ProgramOutcomes />

    <Title text={'Map COs with POs: '} />

    <CoPoMappings />

    <Title text={'Map COs with PSOs: '} />

    <CoPsoMappings />

    <Title text={'Enter Program Specific Outcomes: '} />
    <ProgramSpecificOutcome />

    <Title text={'Enter Course Topics: '} />
    <div class="container mx-auto p-2 text-red-600">
      {$isLab ? 'Experiment List' : 'Chapter Plan'}:
    </div>
    <Topic />

    {#if !$isLab}
      <Title text={'Lesson Plan: '} />
      <LessonPlan />
    {/if}

    <Title text={'Assessment Method: '} />
    <AssessmentMethod />

    <div
      class="container mx-auto p-2 flex mb-10 md:justify-between justify-center
      md:flex-row flex-col">
      <button
        type="submit"
        on:click={saveCourse}
        class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4
        border border-gray-400 my-2 rounded shadow w-full md:w-5/12">
        Save Changes
      </button>
      <button
        class="bg-white hover:bg-gray-100 my-2 text-gray-800 font-semibold py-2
        px-4 border border-gray-400 rounded shadow w-full md:w-5/12"
        on:click={submitCourse}>
        Submit
      </button>
    </div>

  {/await}
</form>
