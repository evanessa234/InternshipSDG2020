<script>
  import { courseStore } from "../../scripts/store";
  import Divider from "../../components/Divider.svelte";
  export let disabled;
</script>

<div class="container mx-auto p-1">
  <div class="w-full">

    {#if $courseStore.programSpecificOutcomes}
      {#each $courseStore.programSpecificOutcomes as programSpecificOutcome, index}
        <div class="flex flex-wrap -mx-3 mb-2 my-2 bg-red-100 py-3 ">
          <div class="w-full md:w-4/12 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs
              font-bold mb-2">
              programSpecificOutcome Number
            </label>
            <div class="relative">
              <select
                class="block appearance-none w-full bg-gray-200 border
                border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded
                leading-tight focus:outline-none focus:bg-white
                focus:border-gray-500"
                id="grid-state"
                bind:value={$courseStore.programSpecificOutcomes[index].number}>
                <option>PSO1</option>
                <option>PSO2</option>
                <option>PSO3</option>
                <option>PSO4</option>
                <option>PSO5</option>
                <option>PSO6</option>
                <option>PSO7</option>
                <option>PSO8</option>
                <option>PSO9</option>
                <option>PSO10</option>

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

          <div class="w-full md:w-6/12 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs
              font-bold mb-2">
              Description
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700
              border border-gray-200 rounded py-3 px-4 leading-tight
              focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="Enter the description..."
              bind:value={$courseStore.programSpecificOutcomes[index].description} />
          </div>

          <div class="w-full md:w-2/12 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs
              font-bold mb-2">
              <br />
            </label>

            {#if !disabled}
              <button
                class="bg-red-300 hover:bg-red-400 text-red-800 font-bold py-3
                px-4 rounded-l w-full"
                on:click={() => {
                  let c = $courseStore.programSpecificOutcomes;
                  c.splice(index, 1);
                  $courseStore.programSpecificOutcomes = c;
                  console.log(c);
                }}>
                Delete
              </button>
            {/if}
          </div>

        </div>
        <Divider />
      {/each}
    {/if}

    {#if !disabled}
      <button
        class="bg-red-300 hover:bg-red-400 text-red-800 font-bold py-2 px-4
        rounded-l w-full"
        on:click={() => {
          let c = $courseStore.programSpecificOutcomes ? $courseStore.programSpecificOutcomes : [];
          c.push({});
          $courseStore.programSpecificOutcomes = c;
          console.log(c);
        }}>
        Add PSO
      </button>
    {/if}
  </div>
</div>
