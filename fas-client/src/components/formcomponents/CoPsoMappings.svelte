<script>
    import { courseStore, isLab } from "../../scripts/store";
    import Divider from "../../components/Divider.svelte";
    export let disabled;
    let psos = ["PSO1", "PSO2", "PSO3", "PSO6", "PSO7", "PSO8", "PSO9"];

    let cos = ["CO1", "CO2", "CO3", "CO4", "CO5", "CO6", "CO7"];
    let copso = [];
  
    for (var i = 0; i < cos.length; i++) {
    copso[i] = new Array(cos[0].length).fill();

    for (var j = 0; j < psos.length; j++) {
      copso[i][j] = {
        // id: v4(),
        coNumber: cos[i],
        poNumber: psos[j],
        rating: ""
      };
    }
  }

  if ($courseStore.coPsoMappings){

  for (let mapping = 0; mapping < copso.length; mapping++) {
    let changed = copso[mapping].filter(
      (sourceItem) =>
        $courseStore.coPsoMappings.find((updatedItem) => {
          let condition =
            updatedItem.coNumber === sourceItem.coNumber &&
            updatedItem.poNumber === sourceItem.poNumber;
          if (condition) {
            copso[mapping][copso[mapping].indexOf(sourceItem)] = updatedItem;
            return condition;
          }
        }) !== undefined
    );
    console.log(changed);
  }
}

  const addco_pso_mapping = () => {
    let co_psoMapping = [];
    for (var i = 0; i < cos.length; i++) {
      for (var j = 0; j < psos.length; j++) {
        if (copso[i][j].rating) {
          co_psoMapping = co_psoMapping.concat(copso[i][j]);
        }
      }
    }
    $courseStore.coPsoMappings = co_psoMapping;
  };
  </script>
  
  <div class="container mx-auto p-2">
    <div class="w-full overflow-x-auto">
  
      <div class="flex md:justify-center">
  
        <table class="table-auto items-center ">
          <thead>
            <tr>
              <th class="w-30" />
              {#each psos as pos, i}
                <th class="w-30">{pos}</th>
              {/each}
  
            </tr>
          </thead>
          <tbody>
  
            {#each cos as co, i}
              <tr>
                <td class="w-30">{co}</td>
                {#each psos as po, j}
                  <td class="w-30">
                    <input type="number" bind:value={copso[i][j].rating} min=0 max=3 class="w-16 border border-red-200" />
                  </td>
                {/each}
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
    <div class="flex justify-center md:my-10 my-3">
      
       {#if !disabled}
       <button
        class="bg-red-300 hover:bg-red-400 text-red-800 font-bold py-2 px-4
        rounded-l w-1/2"
        on:click={addco_pso_mapping}>
        Map
      </button>
      {/if}
    </div>
  
      </div>
  
  
  