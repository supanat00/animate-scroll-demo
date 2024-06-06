import { useGLTF } from "@react-three/drei"
import { useEffect, useRef, useState } from "react"
import { Group, MeshStandardMaterial, TextureLoader, Texture } from "three"

useGLTF.preload("/models/snackbabylon.glb")

interface GelatoModelProps {
    uploadedTexture: string;
}

export default function TausModel({ uploadedTexture }: GelatoModelProps) {
    const group = useRef<Group>(null)
    const [isOriginalTexture, setIsOriginalTexture] = useState<boolean>(true); // Set default value to true
    const [originalTexture, setOriginalTexture] = useState<Texture | null>(null); // Declare originalTexture state
    const [newTexture1, setNewTexture1] = useState<Texture | null>(null); // Declare state for the new texture
    const { scene, materials } = useGLTF("/models/snackbabylon.glb")

    useEffect(() => {
        const textureLoader = new TextureLoader();

    }, []);

    useEffect(() => {

        // Set the initial texture
        if (materials && materials["phong_texture_mat"] instanceof MeshStandardMaterial) {
            // Only set the original texture if it hasn't been set yet
            if (!originalTexture) {
                setOriginalTexture((materials["phong_texture_mat"] as MeshStandardMaterial).map);
            }
            // Use originalTexture if isOriginalTexture is true, otherwise use newTexture1
            (materials["phong_texture_mat"] as MeshStandardMaterial).map = isOriginalTexture ? originalTexture : originalTexture;
            (materials["phong_texture_mat"] as MeshStandardMaterial).needsUpdate = true;
        }
    }, [materials, newTexture1, isOriginalTexture, originalTexture])

    // Update the texture when uploadedTexture changes
    useEffect(() => {
        if (uploadedTexture && materials && materials["phong_texture_mat"] instanceof MeshStandardMaterial) {
            const textureLoader = new TextureLoader();
            textureLoader.load(uploadedTexture, (texture) => {
                (materials["phong_texture_mat"] as MeshStandardMaterial).map = texture;
                (materials["phong_texture_mat"] as MeshStandardMaterial).needsUpdate = true;
            });
        }
    }, [uploadedTexture, materials]);

    return (
        <group ref={group} >
            <primitive object={scene} position={[0, 0, 0]} scale={[15, 15, 15]} rotation={[0.3, 0, 0]} />
        </group>
    )
}
