<script>
  import { courseStore, isLab } from "../../scripts/store";
  import Divider from "../../components/Divider.svelte";
  export let disabled;
</script>

<div class="container mx-auto p-1">
  <div class="w-full">

    {#if $courseStore.programOutcomes}
      {#each $courseStore.programOutcomes as po, index}
        <div class="flex flex-wrap -mx-3 mb-2 my-2 bg-red-100 py-3 ">
          <div class="w-full md:w-2/12 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs
              font-bold mb-2">
              PO Number
            </label>
            <div class="relative">
              <select
                class="block appearance-none w-full bg-gray-200 border
                border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded
                leading-tight focus:outline-none focus:bg-white
                focus:border-gray-500"
                id="grid-state"
                bind:value={$courseStore.programOutcomes[index].number}>
                <option>PO1</option>
                <option>PO2</option>
                <option>PO3</option>
                <option>PO4</option>
                <option>PO5</option>
                <option>PO6</option>
                <option>PO7</option>
                <option>PO8</option>
                <option>PO9</option>
                <option>PO10</option>
                <option>PO11</option>
                <option>PO12</option>
                <option>PO13</option>
                <option>PO14</option>
                <option>PO15</option>

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
              Title
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700
              border border-gray-200 rounded py-3 px-4 leading-tight
              focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="To learn..."
              bind:value={$courseStore.programOutcomes[index].title} />
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
              placeholder="PO description..."
              bind:value={$courseStore.programOutcomes[index].description} />
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
                  let c = $courseStore.programOutcomes;
                  c.splice(index, 1);
                  $courseStore.programOutcomes = c;
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
          let c = $courseStore.programOutcomes ? $courseStore.programOutcomes : [];
          c.push({});
          $courseStore.programOutcomes = c;
          console.log(c);
        }}>
        Add PO
      </button>
    {/if}
  </div>
</div>
