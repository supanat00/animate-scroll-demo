import { useAnimations, useGLTF, useScroll } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { Group } from "three"

useGLTF.preload("/models/gelato.glb")

export default function GelatoModel() {
    const group = useRef<Group>(null)
    const { nodes, materials, animations, scene } = useGLTF(
        "/models/gelato.glb"
    )
    const { actions, clips } = useAnimations(animations, scene)
    const scroll = useScroll()

    useEffect(() => {
        console.log(actions)
        //@ts-ignore
        actions["Animation"].play().paused = true
    }, [])
    useFrame(
        () =>
        //@ts-ignore
        (actions["Animation"].time =
            //@ts-ignore
            (actions["Animation"].getClip().duration * scroll.offset) / 1)
    )
    return (
        <group ref={group} position={[0.9, 0, 0]} scale={[0.08, 0.08, 0.08]}>
            <primitive object={scene} />
        </group>
    )
}
