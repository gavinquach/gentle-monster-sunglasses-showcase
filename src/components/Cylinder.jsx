export default function Cylinder({ color = "#f9f9f9", ...props }) {
    const height = 1.9;
    return (
        <group {...props} dispose={null}>
            <mesh position={[0, height * 0.5, 0]}>
                <cylinderGeometry args={[0.4, 0.4, height, 64]} />
                <meshLambertMaterial color={color} />
            </mesh>
        </group>
    );
}
