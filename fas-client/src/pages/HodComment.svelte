<script>
  import LabOrClass from "../components/formcomponents/LabOrClass.svelte";
  import Title from "../components/formcomponents/Title.svelte";
  import Divider from "../components/Divider.svelte";
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
  import { courseStore, isLab, dqaStore } from "../scripts/store";
  import {
    GETCOURSE,
    GETAUDIT,
    SAVECOMMENT,
    HODAPPROVE
  } from "../scripts/data";
  import { onDestroy } from "svelte";
  import removeTypename from "@naveen-bharathi/remove-graphql-typename";
  export let id;
  export let readOnly;
  console.log(id);
  const client = getClient();
  let unsubCourse, unsubAudit, course, audit, hodComment;
  let toCreate;
  onDestroy(() => {
    courseStore.set({});
    unsubCourse;
    unsubAudit;
  });
  course = query(client, {
    query: GETCOURSE,
    variables: {
      id: id
    }
  });

  audit = query(client, {
    query: GETAUDIT,
    variables: {
      id: id
    }
  });
  unsubCourse = course.subscribe(async value => {
    var result = await value;
    courseStore.set(removeTypename(result.data.course));
    isLab.set($courseStore.practHours ? true : false);
    console.log($courseStore);
  });

  unsubAudit = audit.subscribe(async value => {
    var result = await value;
    console.log(result.data.getAudit);

    toCreate = result.data.getAudit ? false : true;
    console.log(toCreate);

    if (!toCreate) {
      dqaStore.set(removeTypename(result.data.getAudit));
    }
  });

  async function saveComment() {
    await mutate(client, {
      mutation: SAVECOMMENT,
      variables: {
        id: id,
        comment: $courseStore.hodComment
      }
    });

    location.reload();
  }

  async function approve() {
    await saveComment();

    await mutate(client, {
      mutation: HODAPPROVE,
      variables: {
        id: id
      }
    });
    location.reload();
  }
</script>

<style>
  .disabled {
    pointer-events: none;
  }
</style>

<div class="flex p-2 justify-between md:flex-row flex-col bg-red-400 h-12" />

{#await audit then res}{/await}

{#await $course}
  ..loading
{:then res}
{#if !toCreate}
  <div class="container mx-auto">
    <div class="flex md:flex-row flex-wrap">
      <div class="w-full md:w-2/3 disabled">
        <Title text={'Course Details:'} />
        <CourseDetails />
        <Title text={'Course Objectives:'} />
        <CourseObjectives disabled={true} />

        <Title text={'Course Outcomes:'} />

        <CourseOutcomes disabled={true} />

        <Title text={'Program Outcomes:'} />
        <ProgramOutcomes disabled={true} />

        <Title text={'Map COs with POs: '} />

        <CoPoMappings disabled={true} />

        <Title text={'Map COs with PSOs: '} />

        <CoPsoMappings disabled={true} />

        <Title text={'Program Specific Outcomes: '} />
        <ProgramSpecificOutcome disabled={true} />

        <Title text={'Course Topics: '} />
        <div class="container mx-auto p-2 text-red-600">
          {$isLab ? 'Experiment List' : 'Chapter Plan'}:
        </div>
        <Topic disabled={true} />

        {#if !$isLab}
          <Title text={'Lesson Plan: '} />
          <LessonPlan disabled={true} />
        {/if}

        <Title text={'Assessment Method: '} />
        <AssessmentMethod disabled={true} />
      </div>

      <div class="w-full md:w-1/3">
        <div class="dqa disabled">
          <div class="md:px-2">
            <Title text={'CO PO an PSO feedback: '} />
            <div class="flex justify-between">
              Satisfied with BT Level?
              <div>
                <input
                  class="self-center"
                  type="radio"
                  bind:group={$dqaStore.btLevel}
                  value={1} />
                <label>Yes</label>
                <input
                  class="self-center"
                  type="radio"
                  bind:group={$dqaStore.btLevel}
                  value={null} />
                <label>No</label>
              </div>
            </div>
            <div class="flex justify-between">
              Satisfied with grammar?
              <div>
                <input
                  class="self-center"
                  type="radio"
                  bind:group={$dqaStore.grammar}
                  value={1} />
                <label>Yes</label>
                <input
                  class="self-center"
                  type="radio"
                  bind:group={$dqaStore.grammar}
                  value={null} />
                <label>No</label>
              </div>
            </div>
            <Title text={'Any suggestions?'} />
            <textarea
              class="resize border rounded focus:shadow-outline w-full h-12
              bg-gray-200 text-gray-700 border-gray-200 focus:outline-none
              focus:bg-white focus:border-gray-500"
              bind:value={$dqaStore.coComment} />

            <Title text={'CO-PO and CO-PSO mapping feedback: '} />
            <div class="flex justify-between">
              Is CO-PO and CO-PSO mapping acceptable?
              <div>
                <input
                  class="self-center"
                  type="radio"
                  bind:group={$dqaStore.properDistributionMap}
                  value={1} />
                <label>Yes</label>
                <input
                  class="self-center"
                  type="radio"
                  bind:group={$dqaStore.properDistributionMap}
                  value={null} />
                <label>No</label>
              </div>
            </div>
            <Title text={'Any suggestions?'} />
            <textarea
              class="resize border rounded focus:shadow-outline w-full h-12
              bg-gray-200 text-gray-700 border-gray-200 focus:outline-none
              focus:bg-white focus:border-gray-500"
              bind:value={$dqaStore.commentMap} />

            <Title text={'CO Weightage and Chapter Plan'} />
            <div class="flex justify-between">
              Satisfied with CO weightage distribution?
              <div>
                <input
                  class="self-center"
                  type="radio"
                  bind:group={$dqaStore.coWeightage}
                  value={1} />
                <label>Yes</label>
                <input
                  class="self-center"
                  type="radio"
                  bind:group={$dqaStore.coWeightage}
                  value={null} />
                <label>No</label>
              </div>
            </div>

            <Title text={'Lesson Plan'} />
            <div class="flex justify-between">
              Is syllabus covered on time?
              <div>
                <input
                  class="self-center"
                  type="radio"
                  bind:group={$dqaStore.syllabusCoverage}
                  value={1} />
                <label>Yes</label>
                <input
                  class="self-center"
                  type="radio"
                  bind:group={$dqaStore.syllabusCoverage}
                  value={null} />
                <label>No</label>
              </div>
            </div>

            {#if isLab}
              <div class="flex justify-between">
                Satisfied with experiment's weightage distribution?
                <div>
                  <input
                    class="self-center"
                    type="radio"
                    bind:group={$dqaStore.chapterExpWeightage}
                    value={1} />
                  <label>Yes</label>
                  <input
                    class="self-center"
                    type="radio"
                    bind:group={$dqaStore.chapterExpWeightage}
                    value={null} />
                  <label>No</label>
                </div>
              </div>
              Experiment type:
              <input
                class="self-center"
                type="radio"
                bind:group={$dqaStore.typeOfExp}
                value={'Logical'} />
              <label>Logical</label>
              <input
                class="self-center"
                type="radio"
                bind:group={$dqaStore.typeOfExp}
                value={'Application Oriented'} />
              <label>Application Oriented</label>
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs
                font-bold mb-2">
                Other.
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700
                border border-gray-200 rounded py-3 px-4 leading-tight
                focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder=""
                bind:value={$dqaStore.typeOfExp} />
            {:else}
              <div class="flex justify-between">
                Satisfied with topic wise weightage distribution ?
                <div>
                  <input
                    class="self-center"
                    type="radio"
                    bind:group={$dqaStore.chapterExpWeightage}
                    value={1} />
                  <label>Yes</label>
                  <input
                    class="self-center"
                    type="radio"
                    bind:group={$dqaStore.chapterExpWeightage}
                    value={null} />
                  <label>No</label>
                </div>
              </div>
            {/if}
            <div class="flex justify-between">
              Modern tools used?
              <div>
                <input
                  class="self-center"
                  type="radio"
                  bind:group={$dqaStore.modernToolsUsed}
                  value={1} />
                <label>Yes</label>
                <input
                  class="self-center"
                  type="radio"
                  bind:group={$dqaStore.modernToolsUsed}
                  value={null} />
                <label>No</label>
              </div>
            </div>
            <div class="flex justify-between">
              Is time limit justified?
              <div>
                <input
                  class="self-center"
                  type="radio"
                  bind:group={$dqaStore.timeJustified}
                  value={1} />
                <label>Yes</label>
                <input
                  class="self-center"
                  type="radio"
                  bind:group={$dqaStore.timeJustified}
                  value={null} />
                <label>No</label>
              </div>
            </div>
            <div class="flex justify-between">
              Contain topics out of syllabus?
              <div>
                <input
                  class="self-center"
                  type="radio"
                  bind:group={$dqaStore.outOfSyllabus}
                  value={1} />
                <label>Yes</label>
                <input
                  class="self-center"
                  type="radio"
                  bind:group={$dqaStore.outOfSyllabus}
                  value={null} />
                <label>No</label>
              </div>
            </div>
            <Title text={'Any suggestions?'} />
            <textarea
              class="resize border rounded focus:shadow-outline w-full h-12
              bg-gray-200 text-gray-700 border-gray-200 focus:outline-none
              focus:bg-white focus:border-gray-500"
              bind:value={$dqaStore.commentWeightage} />

            <Title text={'Assessment of Course Outcomes'} />
            <div class="flex justify-between">
              Are all CO's covered?
              <div>
                <input
                  class="self-center"
                  type="radio"
                  bind:group={$dqaStore.coCoverageAssMethod}
                  value={1} />
                <label>Yes</label>
                <input
                  class="self-center"
                  type="radio"
                  bind:group={$dqaStore.coCoverageAssMethod}
                  value={null} />
                <label>No</label>
              </div>
            </div>
            <div class="flex justify-between">
              Is marks distribution acceptable?
              <div>
                <input
                  class="self-center"
                  type="radio"
                  bind:group={$dqaStore.marksDistribution}
                  value={1} />
                <label>Yes</label>
                <input
                  class="self-center"
                  type="radio"
                  bind:group={$dqaStore.marksDistribution}
                  value={null} />
                <label>No</label>
              </div>

            </div>

            <Title text={'Any suggestions?'} />
            <textarea
              class="resize border rounded focus:shadow-outline w-full h-12
              bg-gray-200 text-gray-700 border-gray-200 focus:outline-none
              focus:bg-white focus:border-gray-500"
              bind:value={$dqaStore.commentAssMethod} />

          </div>
        </div>
        <div class="{readOnly ? 'disabled' : 'hod'}">
          <Divider />
          <Title text={'HOD Comment:'} />
          <textarea
            class="resize border rounded focus:shadow-outline w-full h-12
            bg-gray-200 text-gray-700 border-gray-200 focus:outline-none
            focus:bg-white focus:border-gray-500"
            bind:value={$courseStore.hodComment} />
          {#if !readOnly}
            <button
              class="bg-red-300 hover:bg-red-400 text-red-800 font-bold py-3
              px-4 rounded-l w-full"
              on:click={saveComment}>
              Save Comment
            </button>
            <Title text={'Approve this audit?'} />

            <button
              class="bg-red-300 hover:bg-red-400 text-red-800 font-bold py-3
              px-4 rounded-l w-full"
              on:click={approve}>
              APPROVE
            </button>
          {/if}
        </div>
      </div>
    </div>
  </div>
{:else}No auditing has been done{/if}
{:catch error}
  {error} err
{/await}
