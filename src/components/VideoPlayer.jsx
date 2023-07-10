import { Billboard, Html } from "@react-three/drei";

// TODO fix occlude="blending" making other HTML elements disappear
export default function VideoPlayer(props) {
    return (
        <group {...props} dispose={null}>
            <group position={[-2, 3, -7]} scale={0.2}>
                <Billboard>
                    <Html
                        name="YoutubeVideo1"
                        className="videoPlayer"
                        prepend
                        transform
                        occlude="blending"
                    >
                        <iframe
                            width={640}
                            height={360}
                            src="https://www.youtube.com/embed/OzP2h2tRBZk?autoplay=1&mute=1&loop=1&playlist=OzP2h2tRBZk&showinfo=0&controls=0"
                            title="GENTLE MONSTER BOLD 2.0"
                            frameborder="0"
                        />
                    </Html>
                </Billboard>
            </group>

            <group position={[2, 3, -7]} scale={0.2}>
                <Billboard>
                    <Html
                        name="YoutubeVideo2"
                        className="videoPlayer"
                        prepend
                        transform
                        occlude="blending"
                    >
                        <iframe
                            width={640}
                            height={360}
                            src="https://www.youtube.com/embed/7msGUVasbdQ?autoplay=1&mute=1&loop=1&playlist=7msGUVasbdQ&showinfo=0&controls=0"
                            title={`GENTLE MONSTER 2023 BOLD Collection "Galaxy of 9 Evenings"`}
                            frameborder="0"
                        />
                    </Html>
                </Billboard>
            </group>
        </group>
    );
}
