import * as THREE from "three";
import { EARTH_ORBIT_RADIUS_UNITS } from "../../lib/constants";
export class Earth {
  ref = $state<THREE.Group>();
  angle = $state(0);
}
