<script lang="ts">
  import { T } from "@threlte/core";
  import * as THREE from "three";
  import type { OrbitalData } from "../../lib/types";
  import { createOrbitGeometry } from "../../lib/utils";

  let { orbitalData }: { orbitalData: OrbitalData } = $props();

  const material = new THREE.LineBasicMaterial({
    color: 0x888888,
    linewidth: 1,
  });

  let geometry: THREE.BufferGeometry | null = $derived(
    createOrbitGeometry(orbitalData, 256),
  );
</script>

{#if geometry}
  <T.Line {geometry} {material} />
{/if}
