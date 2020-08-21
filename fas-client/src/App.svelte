<script>
  import ApolloClient from "apollo-boost";
  import { setClient, query } from "svelte-apollo";
  import { Router, Route, Link } from "svelte-routing";
  import Tailwindcss from "./Tailwind.svelte";
  import Home from "./pages/Home.svelte";
  import Login from "./pages/Login.svelte";
  import Form from "./pages/Form.svelte";
  import Audit from "./pages/Audit.svelte";
  import HodComment from "./pages/HodComment.svelte";
  import { user } from "./scripts/store";
  import { GETUSER } from "./scripts/data";

  export let url = "";
  const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    headers: {
      Authorization: $user.jwt ? $user.jwt : " "
    }
  });
  setClient(client);

  let getUser;
  if ($user.jwt) {
    getUser = query(client, {
      query: GETUSER
    });
  }
</script>

<Tailwindcss />

<Router {url}>
  <div class="m-0 h-screen w-screen">
    {#if !$user.jwt}
      <Route path="/" component={Login} />
    {:else}
      {#await $getUser}
        Loading ...
      {:then result}
        {#if result}
          {#if result.data && result.data.getUser.email === $user.email}
            <Route path="/">
              <Home />
            </Route>
            {#if $user.role === 'DQA'}
              <Route path="course/audit/:id" let:params>
                <Audit id={Number.parseInt(params.id)} />
              </Route>
            {:else if $user.role === 'HOD'}
              <Route path="course/hodcomment/:id" let:params>
                <HodComment id={Number.parseInt(params.id)} />
              </Route>
            {:else}
              <Route path="course/edit/:id" let:params>
                <Form id={Number.parseInt(params.id)} action={'edit'} />
              </Route>
              <Route path="course/create" let:params>
                <Form id={-1} action={'create'} />
              </Route>
            {/if}
            <Route path="course/readonly/:id" let:params>
              <HodComment id={Number.parseInt(params.id)} readOnly={true} />
            </Route>
          {:else}
            <Route path="/" component={Login} />
          {/if}
        {/if}
      {:catch error}
        <Route path="/" component={Login} />
      {/await}
    {/if}

  </div>
</Router>
