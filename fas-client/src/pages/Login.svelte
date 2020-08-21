<script>
  import { getClient, query } from "svelte-apollo";
  import { LOGIN} from "../scripts/data.js";
  import { navigate, link } from "svelte-routing";
  import { user } from '../scripts/store'

  const client = getClient();
  let login, email, password;

  function loginHandler() {
    if (email  && password) {
      login = query(client, {
        query: LOGIN,
        variables: {
          email: email,
          password: password
        }
      });
    }
  }

  function routeAndSave(u) {
    user.set(u);
    // navigate('/', {replace: true})
    location.reload();
  }
</script>


  <div class="bg-red-400 h-full">
    <div class="container mx-auto my-auto">
      <div class="flex justify-center">

        <div class="w-full max-w-xs my-48">
          <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="email">
                Email
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3
                text-gray-700 leading-tight focus:outline-none
                focus:shadow-outline"
                id="email"
                type="text"
                placeholder="RAIT Email"
                bind:value={email} />
            </div>
            <div class="mb-6">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="password">
                Password
              </label>
              <input
                class="shadow appearance-none border border-red-500 rounded w-full
                py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none
                focus:shadow-outline"
                id="password"
                type="password"
                placeholder="******************"
                bind:value={password} />
              <p class="text-red-500 text-xs italic">Please enter password.</p>
            </div>
            <div class="flex items-center justify-center">
              <button
                class="bg-transparent hover:bg-red-500 text-red-700 font-semibold
                hover:text-white py-2 px-4 border border-red-500
                hover:border-transparent rounded"
                type="button"
                on:click={loginHandler}>
                {#await $login}
                  Logging in...
                {:then result}
                  {#if result}
                    {routeAndSave(result.data.loginUser)}
                  {:else}Sign In{/if}

                {:catch error}
                  Error: {error}
                {/await}
              </button>

            </div>
          </form>
          <p class="text-center text-white text-xs">
            Faculty Audit System
          </p>
        </div>
      </div>
    </div>

  </div>
