import { lazy, Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Preload, Stars } from "@react-three/drei";
import { gsap } from "gsap";
import { DEG2RAD } from "three/src/math/MathUtils";

import { video1, video2 } from "./videos";

// HTML elements
const RotationArrow = lazy(() =>
    import("./components/RotationArrow/RotationArrow")
);
const SwitchArrows = lazy(() =>
    import("./components/SwitchArrows/SwitchArrows")
);

// Sunglasses
const CazalSunglasses = lazy(() =>
    import("./components/Models/CazalSunglasses")
);
const PinkSunglasses = lazy(() => import("./components/Models/PinkSunglasses"));
const YellowSunglasses = lazy(() =>
    import("./components/Models/YellowSunglasses")
);
const WhiteSunglasses = lazy(() =>
    import("./components/Models/WhiteSunglasses")
);

// Showcase wrapper for sunglasses
const ShowcaseWrapper = lazy(() => import("./components/ShowcaseWrapper"));

// Video players
const Screen = lazy(() => import("./components/VideoPlayer/Screen"));
// const VideoPlayer = lazy(() => import("./components/VideoPlayer"));

export default function App() {
    const groupRef = useRef();
    const playingAnimation = useRef(false);
    const viewingNumber = useRef(0);
    const glassesRefs = useRef([]);

    const resetRotation = () => {
        glassesRefs.current.forEach((ref) => {
            gsap.to(ref.rotation, {
                duration: 1,
                y: 0,
                ease: "power2.inOut",
            });
        });
    };

    const prepareAnimation = (direction) => {
        if (playingAnimation.current) return false;
        if (direction === "left") {
            if (viewingNumber.current === 0) return false;
        } else {
            if (viewingNumber.current === glassesRefs.current.length) return false;
        }

        // set playing animation to true
        playingAnimation.current = true;

        // reset all glasses' rotation
        resetRotation();

        return true;
    };

    const handleLeftClick = () => {
        if (!prepareAnimation("left")) return;

        gsap.to(groupRef.current.position, {
            duration: 1,
            x: groupRef.current.position.x + 3,
            ease: "power2.inOut",
            onComplete: () => {
                viewingNumber.current -= 1;
                playingAnimation.current = false;
            },
        });
    };

    const handleRightClick = () => {
        if (!prepareAnimation("right")) return;

        gsap.to(groupRef.current.position, {
            duration: 1,
            x: groupRef.current.position.x - 3,
            ease: "power2.inOut",
            onComplete: () => {
                viewingNumber.current += 1;
                playingAnimation.current = false;
            },
        });
    };

    const handleRotationClick = () => {
        if (playingAnimation.current) return;

        playingAnimation.current = true;

        gsap.to(glassesRefs.current[viewingNumber.current].rotation, {
            duration: 1,
            y:
                glassesRefs.current[viewingNumber.current].rotation.y === 0
                    ? Math.PI
                    : 0,
            ease: "power2.inOut",
            onComplete: () => {
                playingAnimation.current = false;
            },
        });
    };

    return (
        <Suspense fallback={null}>
            <SwitchArrows direction="left" onClick={handleLeftClick} />
            <SwitchArrows direction="right" onClick={handleRightClick} />
            <RotationArrow onClick={handleRotationClick} />

            <Canvas
                shadows="accumulative"
                dpr={[1, 1.5]}
                camera={{ position: [0, 3, 4], fov: 30, near: 0.01, far: 200 }}
            >
                <color attach="background" args={["#0b0b0b"]} />
                <Environment files={"/umhlanga_sunrise_2k.hdr"} />
                <Stars
                    radius={50}
                    depth={50}
                    count={5000}
                    factor={4}
                    saturation={0}
                    fade
                    speed={1}
                />

                <directionalLight
                    castShadow
                    position={[100, 75, 100]}
                    shadow-normalBias={0.04}
                />
                <ambientLight intensity={0.3} />

                <OrbitControls
                    makeDefault
                    target={[0, 2.5, 0]}
                    enablePan={false}
                    minPolarAngle={Math.PI * 0.1}
                    maxPolarAngle={Math.PI / 1.4}
                    minAzimuthAngle={-Math.PI / 4}
                    maxAzimuthAngle={Math.PI / 4}
                    minDistance={0.5}
                    maxDistance={2.7}
                />

                <group ref={groupRef}>
                    <group name="sunglasses">
                        <ShowcaseWrapper innerColor="#9948DD" outerColor="#1C3277">
                            <CazalSunglasses ref={(el) => (glassesRefs.current[0] = el)} />
                        </ShowcaseWrapper>
                        <ShowcaseWrapper x={3} innerColor="#1b8427" outerColor="#a21db6">
                            <PinkSunglasses ref={(el) => (glassesRefs.current[1] = el)} />
                        </ShowcaseWrapper>
                        <ShowcaseWrapper x={6} innerColor="#1db61f" outerColor="#847b1b">
                            <YellowSunglasses ref={(el) => (glassesRefs.current[2] = el)} />
                        </ShowcaseWrapper>
                        <ShowcaseWrapper x={9} innerColor="#ff2020" outerColor="#2877ff">
                            <WhiteSunglasses ref={(el) => (glassesRefs.current[3] = el)} />
                        </ShowcaseWrapper>
                    </group>
                </group>

                <group position={[0, 2, -3]} rotation={[0, Math.PI, 0]}>
                    <group rotation-y={DEG2RAD * 40}>
                        <Screen src={video1} />
                    </group>
                    <group rotation-y={DEG2RAD * -40}>
                        <Screen src={video2} />
                    </group>
                </group>

                {/* <VideoPlayer /> */}
                <Preload all />
            </Canvas>
        </Suspense>
    );
}
