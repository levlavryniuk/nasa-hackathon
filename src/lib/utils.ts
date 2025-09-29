import * as THREE from "three";
import type { OrbitalData } from "./types";
import { AU_IN_UNITS } from "./constants";

export function getOrbitPosition(
  orbitData: OrbitalData,
  theta: number,
): THREE.Vector3 {
  // Semi-major axis (in AU)
  const a_au = parseFloat(orbitData.semi_major_axis);
  // Convert to scene units
  const a = a_au * AU_IN_UNITS;

  // Apply visual compression for large orbits (optional, aesthetic)
  const scale = 3 * AU_IN_UNITS;
  const scaledA = a * scale;

  const e = parseFloat(orbitData.eccentricity);
  const i = THREE.MathUtils.degToRad(parseFloat(orbitData.inclination));
  const Ω = THREE.MathUtils.degToRad(
    parseFloat(orbitData.ascending_node_longitude),
  );
  const ω = THREE.MathUtils.degToRad(parseFloat(orbitData.perihelion_argument));

  // Elliptical orbit: r(θ) = a(1-e²) / (1 + e cos θ)
  const r = (scaledA * (1 - e * e)) / (1 + e * Math.cos(theta));

  let pos = new THREE.Vector3(r * Math.cos(theta), r * Math.sin(theta), 0);

  // Rotate by argument of perihelion
  pos.applyMatrix4(new THREE.Matrix4().makeRotationZ(ω));
  // Inclination
  pos.applyMatrix4(new THREE.Matrix4().makeRotationX(i));
  // Longitude of ascending node
  pos.applyMatrix4(new THREE.Matrix4().makeRotationZ(Ω));

  return pos;
}

export function createOrbitGeometry(orbitData: OrbitalData, steps = 128) {
  const pts: THREE.Vector3[] = [];
  const dTheta = (Math.PI * 2) / steps;

  for (let theta = 0; theta <= Math.PI * 2; theta += dTheta) {
    pts.push(getOrbitPosition(orbitData, theta));
  }

  const geometry = new THREE.BufferGeometry().setFromPoints(pts);

  // Optional: tag with ID for reuse
  geometry.setAttribute("position", geometry.getAttribute("position"));

  return geometry;
}
