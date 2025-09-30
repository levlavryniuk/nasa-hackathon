<script lang="ts">
  import { T, useLoader, useTask } from "@threlte/core";
  import SunModel from "./components/sun/sun.svelte";
  import {
    CameraControls,
    Environment,
    interactivity,
    type CameraControlsRef,
  } from "@threlte/extras";
  import type { NearEarthObject } from "./lib/types";
  import {
    EARTH_RADIUS_UNITS,
    KM_PER_UNIT,
    SUN_RADIUS_UNITS,
  } from "./lib/constants";
  import AsteroidModel from "./components/asteroid/component.svelte";
  import EarthModel from "./components/earth/component.svelte";
  import { Asteroid } from "./components/asteroid/asteroid.svelte";
  import { Earth } from "./components/earth/earth.svelte";
  import Orbit from "./components/orbit/orbit.svelte";
  import EarthOrbit from "./components/orbit/earthOrbit.svelte";

  interactivity();
  let {
    asteroidDetails,
    controls = $bindable(),
    earth = $bindable(),
    asteroid = $bindable(),
    enableMovement,
  }: {
    asteroidDetails: NearEarthObject | null;
    enableMovement: boolean;
    asteroid: Asteroid;
    earth: Earth;

    controls?: CameraControlsRef;
  } = $props();

  $inspect(asteroidDetails);

  useTask((d) => {
    if (enableMovement) {
      earth.move(d);
    }
  });
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

<EarthModel
  onclick={(ref) => {
    const p = ref.object.position;
    controls?.fitToBox(ref.object, true);
    // controls?.(p.x, p.y, p.z, true);
  }}
  bind:ref={earth.ref}
  scale={EARTH_RADIUS_UNITS * 10}
/>
<EarthOrbit />

{#if asteroidDetails}
  <Orbit orbitalData={asteroidDetails.orbital_data} />

  <AsteroidModel
    scale={asteroidDetails.estimated_diameter.kilometers
      .estimated_diameter_max /
      2 /
      KM_PER_UNIT}
  />
{/if}

<SunModel scale={SUN_RADIUS_UNITS} />
<Environment url="/assets/sky.hdr" isBackground></Environment>
