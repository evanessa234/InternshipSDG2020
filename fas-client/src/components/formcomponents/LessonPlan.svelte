<script>
  import { courseStore, isLab } from "../../scripts/store";
  import Divider from "../../components/Divider.svelte";
  export let disabled;
</script>

<div class="container mx-auto p-1">
  <div class="w-full">

    {#if $courseStore.lessonPlans}
      {#each $courseStore.lessonPlans as lessonPlan, index}
        <div class="flex flex-wrap -mx-3 mb-2 my-2 bg-red-100 py-3 ">

          <div class="w-full md:w-1/12 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs
              font-bold mb-2">
              Wk No.
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700
              border border-gray-200 rounded py-3 px-4 leading-tight
              focus:outline-none focus:bg-white focus:border-gray-500"
              type="number"
              placeholder="6"
              bind:value={$courseStore.lessonPlans[index].weekNumber} />
          </div>
          <div class="w-full md:w-1/12 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs
              font-bold mb-2">
              Lec No.
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700
              border border-gray-200 rounded py-3 px-4 leading-tight
              focus:outline-none focus:bg-white focus:border-gray-500"
              type="number"
              placeholder="6"
              bind:value={$courseStore.lessonPlans[index].lectureNumber} />
          </div>
          <div class="w-full md:w-2/12 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs
              font-bold mb-2">
              Sub-Topic
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700
              border border-gray-200 rounded py-3 px-4 leading-tight
              focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="Sub-topic name..."
              bind:value={$courseStore.lessonPlans[index].subTopics} />
          </div>
          <div class="w-full md:w-2/12 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs
              font-bold mb-2">
              CO Number
            </label>
            <div class="relative">
              <select
                class="block appearance-none w-full bg-gray-200 border
                border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded
                leading-tight focus:outline-none focus:bg-white
                focus:border-gray-500"
                id="grid-state"
                bind:value={$courseStore.lessonPlans[index].coMeet}>
                <option>CO1</option>
                <option>CO2</option>
                <option>CO3</option>
                <option>CO4</option>
                <option>CO5</option>
                <option>CO6</option>
                <option>CO7</option>
                <option>CO8</option>
                <option>CO9</option>
                <option>CO10</option>

              </select>
              <div
                class="pointer-events-none absolute inset-y-0 right-0 flex
                items-center px-2 text-gray-700">
                <svg
                  class="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20">
                  <path
                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828
                    5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>

          </div>
          <div class="w-full md:w-2/12 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs
              font-bold mb-2">
              Teaching Method
            </label>
            <div class="relative">
              <select
                class="block appearance-none w-full bg-gray-200 border
                border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded
                leading-tight focus:outline-none focus:bg-white
                focus:border-gray-500"
                id="grid-state"
                bind:value={$courseStore.lessonPlans[index].teachingMethod}>
                <option>PPT</option>
                <option>NPTEL Videos</option>
                <option>Case Study</option>
                <option>Group Discussion</option>
                <option>Smart Board</option>
                <option>Quiz</option>
                <option>Puzzle</option>
                <option>Others</option>

              </select>
              <div
                class="pointer-events-none absolute inset-y-0 right-0 flex
                items-center px-2 text-gray-700">
                <svg
                  class="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20">
                  <path
                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828
                    5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>

          </div>

          <div class="w-full md:w-2/12 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs
              font-bold mb-2">
              Weightage
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700
              border border-gray-200 rounded py-3 px-4 leading-tight
              focus:outline-none focus:bg-white focus:border-gray-500"
              type="number"
              placeholder="40"
              bind:value={$courseStore.lessonPlans[index].weightage} />
          </div>
          {#if !disabled}
            <div class="w-full md:w-2/12 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs
                font-bold mb-2">
                <br />
              </label>

              <button
                class="bg-red-300 hover:bg-red-400 text-red-800 font-bold py-3
                px-4 rounded-l w-full"
                on:click={() => {
                  let c = $courseStore.lessonPlans;
                  c.splice(index, 1);
                  $courseStore.lessonPlans = c;
                  console.log(c);
                }}>
                Delete
              </button>

            </div>
          {/if}
        </div>
        <Divider />
      {/each}
    {/if}

    {#if !disabled}
      <button
        class="bg-red-300 hover:bg-red-400 text-red-800 font-bold py-2 px-4
        rounded-l w-full"
        on:click={() => {
          let c = $courseStore.lessonPlans ? $courseStore.lessonPlans : [];
          c.push({});
          $courseStore.lessonPlans = c;
          console.log(c);
        }}>
        Add Entry
      </button>
    {/if}
  </div>
</div>
