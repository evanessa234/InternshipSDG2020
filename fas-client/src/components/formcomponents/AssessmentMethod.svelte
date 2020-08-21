<script>
  import { courseStore, isLab } from "../../scripts/store";
  import Divider from "../../components/Divider.svelte";
  export let disabled;
  let termTestArray = [];
  let termTestNo = ["Term Test 1", "Term Test 2"];
  let questionNos = [1, 2, 3];
  let cos = ["CO1", "CO2", "CO3", "CO4", "CO5", "CO6", "CO7"];

  for (var i = 0; i < 2 * questionNos.length; i++) {
    termTestArray[i] = new Array(questionNos[0].length).fill();

    if (i < questionNos.length) {
      for (var j = 0; j < cos.length; j++) {
        termTestArray[i][j] = {
          method: termTestNo[0],
          number: questionNos[i],
          coMeet: cos[j],
          marks: ""
        };
      }
    } else {
      for (var j = 0; j < cos.length; j++) {
        termTestArray[i][j] = {
          method: termTestNo[1],
          number: questionNos[i - 3],
          coMeet: cos[j],
          marks: ""
        };
      }
    }
  }

  if ($courseStore.assessmentMethods) {
    for (let i = 0; i < $courseStore.assessmentMethods.length; i++) {
      for (var k = 0; k < 2 * questionNos.length; k++) {
        for (var j = 0; j < cos.length; j++) {
          if (
            termTestArray[k][j].number ===
              $courseStore.assessmentMethods[i].number &&
            termTestArray[k][j].coMeet ===
              $courseStore.assessmentMethods[i].coMeet &&
            termTestArray[k][j].method ===
              $courseStore.assessmentMethods[i].method
          ) {
            termTestArray[k][j].marks = $courseStore.assessmentMethods[i].marks;
          }
        }
      }
    }
  }

  const addTermTest = () => {
    let assessmentMethod = [];
    let flag = 1;
    let total1 = 0;
    let total2 = 0;
    for (var i = 0; i < questionNos.length; i++) {
      for (var j = 0; j < cos.length; j++) {
        if (termTestArray[i][j].marks) {
          total1 = termTestArray[i][j].marks + total1;
        }
      }
    }
    console.log(total1 + "hey");
    if (total1 !== 30) {
      alert("ERROR!! sum of marks is NOT 30");
      return flag === 0;
    }

    console.log(total2 + "mid");

    for (var i = questionNos.length; i < 2 * questionNos.length; i++) {
      for (var j = 0; j < cos.length; j++) {
        if (termTestArray[i][j].marks) {
          total2 = termTestArray[i][j].marks + total2;
        }
      }
    }
    console.log(total2 + "last");
    if (total2 !== 30) {
      alert("ERROR!! sum of marks is NOT 30");
      return flag === 0;
    }

    if (flag === 1) {
      for (var i = 0; i < 2 * questionNos.length; i++) {
        for (var j = 0; j < cos.length; j++) {
          if (termTestArray[i][j].marks) {
            assessmentMethod = assessmentMethod.concat(termTestArray[i][j]);
          }
        }
      }
      $courseStore.assessmentMethods = assessmentMethod;
      alert("Successfully mapped Term Test");
    }
  };

  // for assignment
  let assNos = ["Assignment1", "Assignment2", "Assignment3"];
  let assignmentArray = [];

  for (var i = 0; i < assNos.length; i++) {
    assignmentArray[i] = new Array(assNos[0].length).fill();
    for (var j = 0; j < cos.length; j++) {
      assignmentArray[i][j] = {
        method: assNos[i],
        coMeet: cos[j],
        marks: ""
      };
    }
  }

  if ($courseStore.assessmentMethods) {
    for (let i = 0; i < $courseStore.assessmentMethods.length; i++) {
      for (let k = 0; k < assNos.length; k++) {
        for (var j = 0; j < cos.length; j++) {
          if (
            assignmentArray[k][j].coMeet ===
              $courseStore.assessmentMethods[i].coMeet &&
            assignmentArray[k][j].method ===
              $courseStore.assessmentMethods[i].method
          ) {
            assignmentArray[k][j].marks =
              $courseStore.assessmentMethods[i].marks;
          }
        }
      }
    }
  }
  const addAssignment = () => {
    let assessmentMethod = [];
    let flag = 1;
    for (var i = 0; i < assNos.length; i++) {
      let total = 0;
      for (var j = 0; j < cos.length; j++) {
        if (assignmentArray[i][j].marks) {
          total = assignmentArray[i][j].marks + total;
        }        
      }
      if (total !== 30) {
          alert("ERROR!! sum of marks is NOT 30");
          return flag === 0;
        }
    }

    if (flag === 1) {
      for (var i = 0; i < assNos.length; i++) {
        for (var j = 0; j < cos.length; j++) {
          if (assignmentArray[i][j].marks) {
            assessmentMethod = assessmentMethod.concat(assignmentArray[i][j]);
          }
        }
      }
      $courseStore.assessmentMethods = assessmentMethod;
      alert("Successfully mapped assignment marks")
    }
  };
</script>

<div class="container mx-auto p-2">
  {#if !$isLab}
    <button
      class="bg-red-300 hover:bg-red-400 text-red-800 font-bold py-2 px-4
      rounded-l my-2">
      {termTestNo[0]}
    </button>
    <div class="w-full overflow-x-auto">

      <div class="flex md:justify-center">

        <table class="table-auto items-center ">
          <thead>
            <tr>
              <th class="w-30" />
              {#each cos as co, i}
                <th class="w-30">{co}</th>
              {/each}

            </tr>
          </thead>
          <tbody>

            {#each questionNos as q, i}
              <tr>
                <td class="w-30">Q{q}</td>
                {#each cos as co, j}
                  <td class="w-30">
                    <input
                      type="number"
                      bind:value={termTestArray[i][j].marks}
                      class="w-16 border border-red-200" />
                  </td>
                {/each}
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
    <button
      class="bg-red-300 hover:bg-red-400 text-red-800 font-bold py-2 px-4
      rounded-l my-2">
      {termTestNo[1]}
    </button>

    <div class="w-full overflow-x-auto">

      <div class="flex md:justify-center">

        <table class="table-auto items-center ">
          <thead>
            <tr>
              <th class="w-30" />
              {#each cos as co, i}
                <th class="w-30">{co}</th>
              {/each}

            </tr>
          </thead>
          <tbody>

            {#each questionNos as q, i}
              <tr>
                <td class="w-30">Q{q}</td>
                {#each cos as co, j}
                  <td class="w-30">
                    <input
                      type="number"
                      bind:value={termTestArray[i + 3][j].marks}
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
          class="bg-red-300 hover:bg-red-400 text-red-800 font-bold py-2 px-4
          rounded-l w-1/2"
          on:click={addTermTest}>
          Map
        </button>
      {/if}
    </div>
  {:else}
    <div class="w-full overflow-x-auto">

      <div class="flex md:justify-center">

        <table class="table-auto items-center ">
          <thead>
            <tr>
              <th class="w-30" />
              {#each cos as co, i}
                <th class="w-30">{co}</th>
              {/each}

            </tr>
          </thead>
          <tbody>

            {#each questionNos as q, i}
              <tr>
                <td class="w-30">Assignment {q}</td>
                {#each cos as co, j}
                  <td class="w-30">
                    <input
                      type="number"
                      bind:value={assignmentArray[i][j].marks}
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
          class="bg-red-300 hover:bg-red-400 text-red-800 font-bold py-2 px-4
          rounded-l w-1/2"
          on:click={addAssignment}>
          Map
        </button>
      {/if}
    </div>
  {/if}

</div>
