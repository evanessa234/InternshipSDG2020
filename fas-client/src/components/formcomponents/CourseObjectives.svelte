<script>
  import { courseStore } from "../../scripts/store";
  import Divider from "../../components/Divider.svelte";
  export let disabled;
</script>

<div class="container mx-auto p-1">
  <div class="w-full">

    {#if $courseStore.objectives}
      {#each $courseStore.objectives as objective, index}
        <div class="flex flex-wrap -mx-3 mb-2 my-2 bg-red-100 py-3 ">
          <div class="w-full md:w-4/12 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs
              font-bold mb-2">
              Objective Number
            </label>
            <div class="relative">
              <select
                class="block appearance-none w-full bg-gray-200 border
                border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded
                leading-tight focus:outline-none focus:bg-white
                focus:border-gray-500"
                id="grid-state"
                type="number"
                bind:value={$courseStore.objectives[index].number}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>

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
              Name
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700
              border border-gray-200 rounded py-3 px-4 leading-tight
              focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="Objective name..."
              bind:value={$courseStore.objectives[index].name} />
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
                  let c = $courseStore.objectives;
                  c.splice(index, 1);
                  $courseStore.objectives = c;
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
          let c = $courseStore.objectives ? $courseStore.objectives : [];
          c.push({});
          $courseStore.objectives = c;
          console.log(c);
        }}>
        Add Objective
      </button>
    {/if}

  </div>
</div>
