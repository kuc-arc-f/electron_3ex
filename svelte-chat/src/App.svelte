<script lang="ts">
import Router from 'svelte-spa-router'
import { routes } from './routes';
import Head from "./components/Head.svelte";

// console.log(routes);
</script>

<main>
  <Router {routes} />
</main>

<style>
</style>
