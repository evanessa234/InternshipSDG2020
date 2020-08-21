<script>
  import { searchQuery } from "../scripts/store";
</script>

<div class="pt-2 text-red-600 sm:w-full md:max-w-md">
  <input
    class="border-2 border-red-300 bg-white h-10 px-5 pr-16 rounded-md text-sm w-full
    focus:outline-none"
    type="search"
    name="search"
    placeholder="Search"
    bind:value={$searchQuery} 
    />


</div>
