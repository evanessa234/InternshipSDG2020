<script>
  import { navigate } from "svelte-routing";

  function navigateToPage() {
    navigate(`/course/create`, { replace: false });
  }
</script>

<div
on:click={navigateToPage}
  class="w-full border-dashed border-4 border-red-300 flex justify-center h-16
  text-red-600 content-center hover:bg-red-100">
  <div class="self-center m-5">Create New Course</div>

</div>
