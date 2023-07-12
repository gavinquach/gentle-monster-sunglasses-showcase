/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: assetfactory (https://sketchfab.com/assetfactory)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/white-sunglasses-79423b5af040464495ebd44e5e9f6390
Title: White sunglasses
*/

import { forwardRef } from "react";
import { useGLTF } from "@react-three/drei";

const WhiteSunglasses = forwardRef((props, ref) => {
  const { nodes, materials } = useGLTF("/white_sunglasses.glb");
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={0.01} position={[0, -0.18, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube002_WhitePlastic2_0.geometry}
          material={materials.WhitePlastic2}
          position={[0, 18.434, 4.062]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[87.725, 87.725, 91.739]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube004_BlackGlass_0.geometry}
          material={materials.BlackGlass}
          position={[0, 18.434, 4.062]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[87.725, 87.725, 91.739]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane002_WhitePlastic2_0.geometry}
          material={materials.WhitePlastic2}
          position={[0, -7.725, -71.494]}
          scale={120.581}
        />
      </group>
    </group>
  );
});

useGLTF.preload("/white_sunglasses.glb");

export default WhiteSunglasses;