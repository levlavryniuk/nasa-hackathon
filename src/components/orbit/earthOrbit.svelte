<script lang="ts">
  import { T } from "@threlte/core";
  import * as THREE from "three";
  import { EARTH_ORBIT_RADIUS_UNITS } from "../../lib/constants";

  const material = new THREE.LineBasicMaterial({
    color: 0x00ff00,
    linewidth: 1,
  });

  const steps = 256;
  const pts: THREE.Vector3[] = [];
  const dTheta = (Math.PI * 2) / steps;
  for (let theta = 0; theta <= Math.PI * 2; theta += dTheta) {
    pts.push(
      new THREE.Vector3(
        EARTH_ORBIT_RADIUS_UNITS * Math.cos(theta),
        0,
        EARTH_ORBIT_RADIUS_UNITS * Math.sin(theta),
      ),
    );
  }

  const geometry = new THREE.BufferGeometry().setFromPoints(pts);
</script>

<T.Line {geometry} {material} />
