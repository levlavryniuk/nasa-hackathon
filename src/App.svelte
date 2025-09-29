<script lang="ts">
  import { Canvas } from "@threlte/core";
  import Scene from "./Scene.svelte";
  import { onMount } from "svelte";
  import type { NearEarthObject } from "./lib/types";

  let apiKey = "EoDkZXkfbXs0Suw8bLJdGcIDNE4fkhzR2XhUjK10";
  let selected = $state<string>("");

  let asteroids = $state<NearEarthObject[]>([]);
  let asteroidDetails = $state<NearEarthObject | null>(null);

  onMount(async () => {
    const res = await fetch(
      `https://www.neowsapp.com/rest/v1/neo/browse?page=0&size=10&api_key=${apiKey}`,
    );
    const data = await res.json();
    asteroids = data.near_earth_objects || [];
  });

  $effect(() => {
    if (!selected) {
      asteroidDetails = null;
      return;
    }
    fetch(`https://www.neowsapp.com/rest/v1/neo/${selected}?api_key=${apiKey}`)
      .then((r) => r.json())
      .then((r) => (asteroidDetails = r));
  });
</script>

<div class="w-screen h-screen flex flex-col">
  <!-- UI Overlay -->
  <div class="absolute top-4 z-50 left-4 bg-black/60 text-white p-3 rounded">
    <label>Asteroid: </label>
    <select bind:value={selected}>
      <option disabled value="">-- select asteroid --</option>
      {#each asteroids as a (a.id)}
        <option value={a.id}>{a.name}</option>
      {/each}
    </select>

    {#if asteroidDetails}
      <div class="mt-3 space-y-1 text-sm">
        <div><b>Name:</b> {asteroidDetails.name}</div>
        <div><b>Magnitude (H):</b> {asteroidDetails.absolute_magnitude_h}</div>
        <div>
          <b>Estimated Diameter:</b>
          {asteroidDetails.estimated_diameter.kilometers.estimated_diameter_min.toFixed(
            2,
          )} –
          {asteroidDetails.estimated_diameter.kilometers.estimated_diameter_max.toFixed(
            2,
          )} km
        </div>
        <div>
          <b>Potentially Hazardous:</b>
          {asteroidDetails.is_potentially_hazardous_asteroid ? "Yes" : "No"}
        </div>
        <div>
          <b>Orbit Class:</b>
          {asteroidDetails.orbital_data.orbit_class.orbit_class_description}
        </div>
        <div>
          <b>Orbital Period:</b>
          {asteroidDetails.orbital_data.orbital_period} days
        </div>
        <div>
          <a
            class="text-blue-400 underline"
            href={asteroidDetails.nasa_jpl_url}
            target="_blank">NASA JPL Page</a
          >
        </div>
      </div>
    {/if}
  </div>

  <!-- Canvas for 3D Scene -->

  <Canvas>
    <Scene {asteroidDetails} />
  </Canvas>
</div>
