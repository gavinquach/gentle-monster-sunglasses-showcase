import { lazy, Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import {
    OrbitControls,
    Float,
    Environment,
    Sky,
    Preload,
} from "@react-three/drei";
import { gsap } from "gsap";

const Cylinder = lazy(() => import("./components/Cylinder"));
const CatEyeSunglasses = lazy(() => import("./components/CatEyeSunglasses"));
const CazalSunglasses = lazy(() => import("./components/CazalSunglasses"));
const WhiteSunglasses = lazy(() => import("./components/WhiteSunglasses"));
const RotationArrow = lazy(() => import("./components/RotationArrow/RotationArrow"));
const SwitchArrows = lazy(() =>
    import("./components/SwitchArrows/SwitchArrows")
);

export default function App() {
    const groupRef = useRef();
    const playingAnimation = useRef(false);
    const viewingNumber = useRef(0);

    const glasses1 = useRef();
    const glasses2 = useRef();
    const glasses3 = useRef();

    const resetRotation = () => {
        gsap.to(glasses1.current.rotation, {
            duration: 1,
            y: 0,
            ease: "power2.inOut",
        });
        gsap.to(glasses2.current.rotation, {
            duration: 1,
            y: 0,
            ease: "power2.inOut",
        });
        gsap.to(glasses3.current.rotation, {
            duration: 1,
            y: 0,
            ease: "power2.inOut",
        });
    };

    const prepareAnimation = (direction) => {
        if (direction === "left") {
            if (playingAnimation.current || viewingNumber.current === 0) return false;
        } else {
            if (playingAnimation.current || viewingNumber.current === 2) return false;
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

        if (viewingNumber.current === 0) {
            gsap.to(glasses1.current.rotation, {
                duration: 1,
                y: glasses1.current.rotation.y === 0 ? Math.PI : 0,
                ease: "power2.inOut",
                onComplete: () => {
                    playingAnimation.current = false;
                },
            });
        } else if (viewingNumber.current === 1) {
            gsap.to(glasses2.current.rotation, {
                duration: 1,
                y: glasses2.current.rotation.y === 0 ? Math.PI : 0,
                ease: "power2.inOut",
                onComplete: () => {
                    playingAnimation.current = false;
                },
            });
        } else if (viewingNumber.current === 2) {
            gsap.to(glasses3.current.rotation, {
                duration: 1,
                y: glasses3.current.rotation.y === 0 ? Math.PI : 0,
                ease: "power2.inOut",
                onComplete: () => {
                    playingAnimation.current = false;
                },
            });
        }
    };

    return (
        <Suspense fallback={null}>
            <SwitchArrows direction="left" onClick={handleLeftClick} />
            <SwitchArrows direction="right" onClick={handleRightClick} />
            <RotationArrow onClick={handleRotationClick} />

            <Canvas
                shadows="accumulative"
                dpr={[1, 1.5]}
                camera={{ position: [0, 3, 4], fov: 30 }}
            >
                <color attach="background" args={["#e3f4ff"]} />
                <Sky sunPosition={[100, 75, 100]} />
                <directionalLight castShadow position={[100, 75, 100]} />
                <ambientLight intensity={0.3} />
                <Environment files={"/umhlanga_sunrise_2k.hdr"} />

                <OrbitControls
                    makeDefault
                    target={[0, 2.5, 0]}
                    enablePan={false}
                    minPolarAngle={Math.PI * 0.1}
                    maxPolarAngle={Math.PI / 1.5}
                    minAzimuthAngle={-Math.PI / 4}
                    maxAzimuthAngle={Math.PI / 4}
                    minDistance={0.5}
                    maxDistance={2.7}
                />
                <group ref={groupRef}>
                    <group name="sunglasses">
                        <Float
                            position={[0, 2.5, 0]}
                            speed={2.5}
                            floatIntensity={2}
                            floatingRange={[-0.05, 0.05]}
                        >
                            <CatEyeSunglasses ref={glasses1} />
                        </Float>
                        <Float
                            position={[3, 2.5, 0]}
                            speed={2.5}
                            floatIntensity={2}
                            floatingRange={[-0.05, 0.05]}
                        >
                            <CazalSunglasses ref={glasses2} />
                        </Float>
                        <Float
                            position={[6, 2.5, 0]}
                            speed={2.5}
                            floatIntensity={2}
                            floatingRange={[-0.05, 0.05]}
                        >
                            <WhiteSunglasses ref={glasses3} />
                        </Float>
                    </group>
                    <group name="cylinders">
                        <Cylinder color="#eeff00" />
                        <Cylinder color="#8eeeff" position={[3, 0, 0]} />
                        <Cylinder color="#ff9191" position={[6, 0, 0]} />
                    </group>
                </group>
                <mesh rotation={[-Math.PI * 0.5, 0, 0]}>
                    <planeGeometry args={[100, 100]} />
                    <meshStandardMaterial color="#e3f4ff" />
                </mesh>
                <Preload all />
            </Canvas>
        </Suspense>
    );
}
