<script lang="ts">
  import { T, type Props } from "@threlte/core";
  import { useGltf } from "@threlte/extras";
  import { Group } from "three";

  let {
    fallback,
    error,
    children,
    ref = $bindable(),
    ...props
  }: Props<typeof Group> = $props();

  const gltf = useGltf("/assets/earth.glb");
</script>

<T.Group bind:ref dispose={false} {...props}>
  {#await gltf}
    {@render fallback?.()}
  {:then gltf}
    <T.Mesh
      geometry={gltf.nodes.earth.geometry}
      material={gltf.materials.Material}
    />
  {:catch err}
    {@render error?.({ error: err })}
  {/await}

  {@render children?.({ ref })}
</T.Group>
