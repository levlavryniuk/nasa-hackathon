import * as THREE from "three";
import type { OrbitalData } from "../../lib/types";
import { getOrbitPosition } from "../../lib/utils";

export class Asteroid {
  ref = $state<THREE.Group>();
  theta = $state(0);
  orbitalData: OrbitalData | null = $state(null);
  scaleValue = $state(1);

  setOrbit(orbitalData: OrbitalData) {
    this.orbitalData = orbitalData;
    // this.updatePosition();
  }

  move(delta: number) {
    if (!this.orbitalData) return;
    const daysPerSecond = 30;
    this.theta +=
      (delta * daysPerSecond * Math.PI * 2) /
      parseFloat(this.orbitalData.orbital_period);
    this.updatePosition();
  }

  updatePosition() {
    if (!this.orbitalData || !this.ref) return;
    const pos = getOrbitPosition(this.orbitalData, this.theta);
    this.ref.position.copy(pos);
  }

  size(diameterKm: number): number {
    const rawScale = diameterKm / 100;
    return Math.max(0.05, Math.cbrt(rawScale));
  }
}
