<script>
  import CreateCourse from "../components/CreateCourse.svelte";
  import CourseListItem from "../components/CourseListItem.svelte";
  import SearchBar from "../components/SearchBar.svelte";
  import { user, searchQuery, searchFilter } from "../scripts/store";
  import { getClient, query } from "svelte-apollo";
  import { GETCOURSES } from "../scripts/data";
  import { onDestroy } from "svelte";

  onDestroy(() => {
    searchQuery.set("");
    unsubCourses;
    searchQuery;
  });
  const client = getClient();
  function logout() {
    user.set({});
    navigate("/", { replace: true });
  }
  let coursesList;
  let toShow;
  let courses = query(client, {
    query: GETCOURSES
  });
  const unsubCourses = courses.subscribe(async value => {
    let result = await value;
    coursesList = result.data.courses;
    toShow = coursesList;
  });

  const unSubSearchQuery = searchQuery.subscribe(value => {
    toShow = search(coursesList);
  });

  function reload() {
    courses.refetch();
  }

  function search(courses) {
    let searched = [];
    let filters = ["name", "id"];
    if ($searchQuery.length === 0) {
      searched = courses;
    } else {
      courses.forEach(course => {
        if (
          course[filters[$searchFilter]]
            .toLowerCase()
            .includes($searchQuery.toLowerCase())
        ) {
          searched.push(course);
        }
      });
    }

    return searched;
  }
</script>

<style>
  .create-button {
    user-select: none;
  }
</style>

<div class="flex p-2 justify-between md:flex-row flex-col bg-red-400">
  <button
    class="bg-white hover:bg-red-500 text-red-700 font-semibold hover:text-white
    py-2 px-4 border border-white hover:border-transparent rounded"
    on:click={logout}>
    LOG OUT
  </button>

  <SearchBar />

  <div class="text-white self-center">
    Logged in as, {$user.firstName} {$user.lastName}
  </div>
</div>
<div class="container mx-auto p-5 create-button">
  {#if $searchQuery.length === 0}
    {#if !$user.role}
      <div class="flex mx-auto justify-between w-11/12">

        <CreateCourse />

        <button
          class="ml-5 bg-red-300 hover:bg-red-400 text-red-800 font-bold py-2
          px-4 rounded-l"
          on:click={reload}>
          RELOAD
        </button>
      </div>
    {/if}
  {/if}
  {#if coursesList}
    {#each toShow as course, index}
      <CourseListItem {course} {index} />
    {/each}
  {/if}
</div>
