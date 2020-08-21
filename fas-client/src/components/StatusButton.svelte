<script>
export let attr;

let color = attr.status ? 'green': 'red'
</script>

{#if attr.value !== null}
<button
  class="bg-{color}-300 hover:bg-{color}-400 text-{color}-800 font-bold py-2 px-4 rounded-l
  mx-1 my-1">
  {attr.value}
</button>

{/if}