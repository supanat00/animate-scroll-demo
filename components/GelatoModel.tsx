import { useAnimations, useGLTF, useScroll } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useEffect, useRef, useState } from "react"
import { Group, MeshStandardMaterial, TextureLoader, Texture } from "three"

useGLTF.preload("/models/gelato.glb")

interface GelatoModelProps {
    uploadedTexture: string;
}

export default function GelatoModel({ uploadedTexture }: GelatoModelProps) {
    const group = useRef<Group>(null)
    const [isOriginalTexture, setIsOriginalTexture] = useState<boolean>(true); // Set default value to true
    const [originalTexture, setOriginalTexture] = useState<Texture | null>(null); // Declare originalTexture state
    const [newTexture1, setNewTexture1] = useState<Texture | null>(null); // Declare state for the new texture
    const { animations, scene, materials } = useGLTF("/models/gelato.glb")
    const { actions } = useAnimations(animations, scene)
    const scroll = useScroll()

    useEffect(() => {
        const textureLoader = new TextureLoader();
        textureLoader.load("/textures/gelato_texture.jpg", (texture) => {
            setNewTexture1(texture);
        });
    }, []);

    useEffect(() => {
        if (actions) {
            const action = actions['Animation']
            if (action) {
                action.play().paused = true
            }
        }

        // Set the initial texture
        if (materials && materials["Material.005"] instanceof MeshStandardMaterial) {
            // Only set the original texture if it hasn't been set yet
            if (!originalTexture) {
                setOriginalTexture((materials["Material.005"] as MeshStandardMaterial).map);
            }
            // Use originalTexture if isOriginalTexture is true, otherwise use newTexture1
            (materials["Material.005"] as MeshStandardMaterial).map = isOriginalTexture ? originalTexture : originalTexture;
            (materials["Material.005"] as MeshStandardMaterial).needsUpdate = true;
        }
    }, [actions, materials, newTexture1, isOriginalTexture, originalTexture])

    // Update the texture when uploadedTexture changes
    useEffect(() => {
        if (uploadedTexture && materials && materials["Material.005"] instanceof MeshStandardMaterial) {
            const textureLoader = new TextureLoader();
            textureLoader.load(uploadedTexture, (texture) => {
                (materials["Material.005"] as MeshStandardMaterial).map = texture;
                (materials["Material.005"] as MeshStandardMaterial).needsUpdate = true;
            });
        }
    }, [uploadedTexture, materials]);

    useFrame(() => {
        if (actions["Animation"]) {
            actions["Animation"].time = actions["Animation"].getClip().duration * scroll.offset
        }
    })

    return (
        <group ref={group} >
            <primitive object={scene} position={[0.9, 0, 0]} scale={[0.09, 0.09, 0.09]} />
        </group>
    )
}
