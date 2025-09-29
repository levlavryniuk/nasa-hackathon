<script lang="ts">
  import { T, useLoader } from "@threlte/core";
  import {
    CameraControls,
    Environment,
    interactivity,
    type CameraControlsRef,
  } from "@threlte/extras";
  import type { NearEarthObject } from "./lib/types";
  import { EARTH_RADIUS_UNITS, KM_PER_UNIT } from "./lib/constants";
  import AsteroidModel from "./components/asteroid/component.svelte";
  import EarthModel from "./components/earth/component.svelte";
  import { Asteroid } from "./components/asteroid/asteroid.svelte";
  import { Earth } from "./components/earth/earth.svelte";
  import { HDRLoader } from "three/examples/jsm/Addons.js";
  import { EquirectangularReflectionMapping } from "three";

  interactivity();
  let {
    asteroidDetails,
  }: {
    asteroidDetails: NearEarthObject | null;
  } = $props();

  let asteroid = new Asteroid();
  let earth = new Earth();

  $effect(() => {
    if (asteroidDetails?.orbital_data) {
      asteroid.setOrbit(asteroidDetails.orbital_data);
    }
  });

  const { load } = useLoader(HDRLoader);
  let controls = $state.raw<CameraControlsRef>();
  const map = load("/assets/sky.hdr", {
    transform(texture) {
      texture.mapping = EquirectangularReflectionMapping;
      return texture;
    },
  });
  $inspect(asteroidDetails);
</script>

<T.PerspectiveCamera
  makeDefault
  fov={60}
  near={1}
  far={1e6}
  position={[0, 20, 0]}
>
  <CameraControls bind:ref={controls} />
</T.PerspectiveCamera>

<EarthModel bind:ref={earth.ref} scale={EARTH_RADIUS_UNITS} />
{#if asteroidDetails}
  <AsteroidModel
    bind:ref={asteroid.ref}
    position={[29, 0, 0]}
    onclick={(ref) => {
      controls?.fitToBox(ref.object, true);
      const p = ref.object.position;
      controls?.setTarget(p.x, p.y, p.z, true);
    }}
    scale={asteroid.size(
      asteroidDetails?.estimated_diameter.kilometers.estimated_diameter_max /
        2 /
        KM_PER_UNIT,
    )}
  />
{/if}
{#await map then texture}
  <Environment isBackground {texture} />
{/await}
