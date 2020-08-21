<script>
  import StatusButton from "./StatusButton.svelte";
  import { navigate } from "svelte-routing";
  import { user } from "../scripts/store.js";
  export let course;
  export let index;
  let showDetails = false;
  let toggleDetails = () => {
    showDetails = !showDetails;
  };

  console.log(course);

  function edit(id) {
    navigate(`/course/edit/${id}`, { replace: false });
  }
</script>

<div
  class="my-2 w-11/12 border-solid border-2 border-red-300 flex justify-between
  mx-auto h-16 text-red-600 content-center rounded-md">
  <div class="self-center mx-1">
    <button
      class="bg-red-300 hover:bg-red-400 text-red-800 font-bold py-2 px-4
      rounded-l">
      {index + 1}
    </button>
  </div>
  <div class="self-center text-lg font-semibold truncate">{course.name}</div>
  <div class="self-center mx-1">
    <div class="inline-flex">
      <button
        class="bg-green-300 hover:bg-green-400 text-green-800 font-bold py-2
        px-4 rounded-l"
        on:click={toggleDetails}>
        Details
      </button>
      {#if $user.role === 'DQA'}
        <button
          class="bg-blue-300 hover:bg-blue-400 text-blue-800 font-bold py-2 px-4
          rounded-r"
          on:click={() => {
            navigate(`/course/audit/${course.id}`, { replace: false });
          }}>
          AUDIT
        </button>
      {:else if $user.role === 'HOD'}
        <button
          class="bg-blue-300 hover:bg-blue-400 text-blue-800 font-bold py-2 px-4
          rounded-r"
          on:click={() => {
            navigate(`/course/hodcomment/${course.id}`, { replace: false });
          }}>
          COMMENT
        </button>
      {:else}
        <button
          class="bg-blue-300 hover:bg-blue-400 text-blue-800 font-bold py-2 px-4
          rounded-r"
          on:click={edit(course.id)}>
          Edit
        </button>
      {/if}
    </div>
  </div>
</div>
{#if showDetails}
  <div
    class="bg-red-200 mx-auto w-11/12 rounded-md flex flex-wrap flex-col
    md:flex-row p-2">
    <StatusButton
      attr={{ status: course.submitBy ? true : false, value: course.submitBy ? 'Submitted' : 'Not Submitted' }} />

    <StatusButton
      attr={{ status: course.dqaApproved ? true : false, value: course.dqaApproved ? 'DQA Approved' : 'DQA Unapproved' }} />

      <StatusButton
        attr={{ status: course.hodApproved ? true : false, value: course.hodApproved ? 'HOD Approved' : 'HOD Unapproved' }} />
      <button
  class="bg-blue-300 hover:bg-blue-400 text-blue-800 font-bold py-2 px-4 rounded-l
  mx-1 my-1" on:click={() => {
    navigate(`/course/readonly/${course.id}`, { replace: false });
  }}>
  MORE DETAILS
</button>

  </div>
{/if}
