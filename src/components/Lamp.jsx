import { SpotLight, useDepthBuffer } from "@react-three/drei";

export default function Lamp({ softParticles = false, ...props }) {
    const depthBuffer = useDepthBuffer();

    return (
        <SpotLight
            depthBuffer={softParticles ? depthBuffer : null}
            {...props}
        />
    );
}