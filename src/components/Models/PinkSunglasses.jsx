/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: assetfactory (https://sketchfab.com/assetfactory)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/pink-round-sunglasses-e2a0a0c088a64ab185f948f87da9d7e3
Title: Pink round sunglasses
*/

import { forwardRef } from "react";
import { useGLTF } from "@react-three/drei";

const PinkRoundSunglasses = forwardRef((props, ref) => {
    const { nodes, materials } = useGLTF("/pink_round_sunglasses.glb");
    return (
        <group ref={ref} {...props} dispose={null}>
            <group position={[0, -0.2, -0.1]} scale={0.01}>
                <group
                    position={[54.156, 21.187, 24.158]}
                    rotation={[-1.673, 0, 0]}
                    scale={[2.099, 0.836, 0.959]}
                >
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Cube001_Gold_0.geometry}
                        material={materials.Gold}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Cube001_BrownPlastic_0.geometry}
                        material={materials.BrownPlastic}
                    />
                </group>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder001_Gold_0.geometry}
                    material={materials.Gold}
                    position={[30.256, 20.617, 18.585]}
                    rotation={[0.026, 0, 0]}
                    scale={100}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder002_PinkGlass_0.geometry}
                    material={materials.PinkGlass}
                    position={[30.256, 20.617, 18.585]}
                    rotation={[0.026, 0, 0]}
                    scale={100}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder003_WhitePlastic_0.geometry}
                    material={materials.WhitePlastic}
                    position={[30.256, 20.617, 18.585]}
                    rotation={[0.026, 0, 0]}
                    scale={100}
                />
            </group>
        </group>
    );
});

useGLTF.preload("/pink_round_sunglasses.glb");

export default PinkRoundSunglasses;