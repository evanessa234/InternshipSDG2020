<script>
  import { isLab, courseStore } from "../../scripts/store";

  let active =
    "ml-5 bg-red-300 hover:bg-red-400 text-red-800 font-bold py-2 px-4 rounded-l";
  let inactive =
    "ml-5 bg-red-100 border border-red-400 hover:bg-red-400 text-red-400 hover:text-red-100 font-bold py-2 px-4 rounded-l";
</script>


<div class="container mx-auto p-2">
  <div
    class="flex md:justify-start md:my-0 my-2 justify-center md:flex-row
    flex-col">
    <div class="self-center font-bold text-center">
      Please check on course type before proceeding!!!
    </div>
    <div class="flex self-center md:my-0 my-2 md:justify-center justify-evenly">
      <button
        class={$isLab ? active : inactive}
        on:click={() => {
          isLab.set(true);
          $courseStore = {};
          
        }}>
        Lab Course
      </button>
      <button
        class={$isLab ? inactive : active}
        on:click={() => {
          isLab.set(false);
          $courseStore = {};

        }}>
        Class Course
      </button>
    </div>
  </div>
</div>
