<script>
  import { courseStore, isLab } from "../../scripts/store";
</script>

<div class="container mx-auto p-2">

  <div class="w-full">
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full md:w-4/12 px-3 mb-6 md:mb-0">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold
          mb-2">
          From Academic Year
        </label>
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 border
          border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none
          focus:bg-white focus:border-gray-500"
          type="number"
          placeholder="2020"
          bind:value={$courseStore.from} required/>
      </div>
      <div class="w-full md:w-4/12 px-3">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold
          mb-2">
          To Academic Year
        </label>
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 border
          border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none
          focus:bg-white focus:border-gray-500"
          type="number"
          placeholder="2021"
          bind:value={$courseStore.to} required/>
      </div>
      <div class="w-full md:w-4/12 px-3">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold
          mb-2">
          Sem
        </label>
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 border
          border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none
          focus:bg-white focus:border-gray-500"
          type="number"
          placeholder="4"
          bind:value={$courseStore.sem}  required/>
      </div>
    </div>

    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full md:w-4/12 px-3 mb-6 md:mb-0">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold
          mb-2">
          Subject Code
        </label>
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 border
          border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none
          focus:bg-white focus:border-gray-500"
          type="text"
          placeholder="CSE502"
          bind:value={$courseStore.subjectCode}  required/>
      </div>
      <div class="w-full md:w-4/12 px-3">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold
          mb-2">
          Course Name
        </label>
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 border
          border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none
          focus:bg-white focus:border-gray-500"
          type="text"
          placeholder="Database Management System"
          bind:value={$courseStore.name}  required/>
      </div>
      <div class="w-full md:w-4/12 px-3">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold
          mb-2">
          Credits
        </label>
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 border
          border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none
          focus:bg-white focus:border-gray-500"
          type="number"
          placeholder="4"
          bind:value={$courseStore.credits}  required/>
      </div>
    </div>

    <div class="flex flex-wrap -mx-3 mb-6">
      {#if $isLab}
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold
            mb-2">
            Practical Hours / Week
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border
            border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none
            focus:bg-white focus:border-gray-500"
            type="number"
            placeholder="6"
            bind:value={$courseStore.practHours}  required/>
        </div>
        <div class="w-full md:w-1/2 px-3">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold
            mb-2">
            Total Contact Hours
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border
            border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none
            focus:bg-white focus:border-gray-500"
            type="number"
            placeholder="52"
            bind:value={$courseStore.toPractHours}  required/>
        </div>
      {:else}
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold
            mb-2">
            Lecture Hours / Week
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border
            border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none
            focus:bg-white focus:border-gray-500"
            type="number"
            placeholder="6"
            bind:value={$courseStore.lectHours}  required/>
        </div>
        <div class="w-full md:w-1/2 px-3">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold
            mb-2">
            Total Contact Hours
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border
            border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none
            focus:bg-white focus:border-gray-500"
            type="number"
            placeholder="52"
            bind:value={$courseStore.toLectHours}  required/>
        </div>
      {/if}
      
    </div>

  </div>
</div>
