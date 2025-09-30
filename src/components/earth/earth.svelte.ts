import * as THREE from "three";
import { EARTH_ORBIT_RADIUS_UNITS } from "../../lib/constants";
export class Earth {
  ref = $state<THREE.Group>();
  angle = $state(0);

  move(delta: number) {
    const daysPerSecond = 30;
    this.angle += (delta * daysPerSecond * Math.PI * 2) / 365.25;
    const x = EARTH_ORBIT_RADIUS_UNITS * Math.cos(this.angle);
    const y = 0;
    const z = EARTH_ORBIT_RADIUS_UNITS * Math.sin(this.angle);
    if (this.ref) this.ref.position.set(x, y, z);
  }
}
