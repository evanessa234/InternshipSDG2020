<script>
  import { courseStore } from "../../scripts/store";
  import Divider from "../../components/Divider.svelte";
  export let disabled;
  let pos = [
    "PO1",
    "PO2",
    "PO3",
    "PO4",
    "PO5",
    "PO6",
    "PO7",
    "PO8",
    "PO9",
    "PO10",
    "PO11",
    "PO12"
  ];
  let cos = ["CO1", "CO2", "CO3", "CO4", "CO5", "CO6", "CO7"];
  let copo = [];

  for (var i = 0; i < cos.length; i++) {
    copo[i] = new Array(cos[0].length).fill();

    for (var j = 0; j < pos.length; j++) {
      copo[i][j] = {
        // co_po_id: v4(),
        coNumber: cos[i],
        poNumber: pos[j],
        rating: ""
      }; // Here is the fixed column access using the outter index i.
    }
  }
  console.log(JSON.stringify($courseStore.coPoMappings));
  if ($courseStore.coPoMappings) {
    console.log("works");
    for (let mapping = 0; mapping < copo.length; mapping++) {
      let changed = copo[mapping].filter(
        sourceItem =>
          $courseStore.coPoMappings.find(updatedItem => {
            let condition =
              updatedItem.coNumber === sourceItem.coNumber &&
              updatedItem.poNumber === sourceItem.poNumber;
            if (condition) {
              copo[mapping][copo[mapping].indexOf(sourceItem)] = updatedItem;
              return condition;
            }
          }) !== undefined
      );
      console.log(changed);
    }
  }

  const addco_po_mapping = () => {
    let coPoMappings = [];
    let flag = 1;
    for (var i = 0; i < cos.length; i++){
      let total = 0;
      for (var j = 0; j < pos.length; j++) {
        if (copo[i][j].rating) {
          total = copo[i][j].rating + total;
        }
      }
      console.log(total);
      if(total !== 10){
        alert("ERROR!! sum of CO-PO map is NOT 10");
        return (flag ===0);
      }
    }
    if (flag === 1) {
      for (var i = 0; i < cos.length; i++) {
        for (var j = 0; j < pos.length; j++) {
          if (copo[i][j].rating) {
            coPoMappings = coPoMappings.concat(copo[i][j]);
            // total = copo[i][j].rating + total;
          }
        }
      }
      $courseStore.coPoMappings = coPoMappings;
      alert("Successfully mapped CO-PO");
    }
  };

  function findIndex(co, po) {
    console.log($courseStore.coPoMappings.length);
    for (let i = 0; i < $courseStore.coPoMappings.length; i++) {
      if (
        $courseStore.coPoMappings[i].coNumber === co &&
        $courseStore.coPoMappings[i].poNumber === po
      ) {
        console.log(i);
        return i;
      }
    }
  }
</script>

<div class="container mx-auto p-2">
  <div class="w-full overflow-x-auto">

    <div class="flex md:justify-center">

      <table class="table-auto items-center ">
        <thead>
          <tr>
            <th class="w-30" />
            {#each pos as pos, i}
              <th class="w-30">{pos}</th>
            {/each}

          </tr>
        </thead>
        <tbody>

          {#each cos as co, i}
            <tr>
              <td class="w-30">{co}</td>
              {#each pos as po, j}
                <td class="w-30">
                  <!-- {findIndex(co, po)} -->
                  <input
                    type="number"
                    bind:value={copo[i][j].rating}
                    min=0 max=3
                    class="w-16 border border-red-200" />
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
        on:click={addco_po_mapping}
        class="bg-red-300 hover:bg-red-400 text-red-800 font-bold py-2 px-4
        rounded-l w-1/2">
        Map
      </button>
    {/if}
  </div>

</div>
