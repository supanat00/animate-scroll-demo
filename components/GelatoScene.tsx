"use client"
import { useState } from "react"
import { Canvas } from "@react-three/fiber"
import GelatoModel from "./GelatoModel"
import { Suspense } from "react"
import { useProgress, Html, ScrollControls, OrbitControls } from "@react-three/drei"

function Loader() {
    const { progress } = useProgress()
    return <Html center>{progress.toFixed(1)} % loaded</Html>
}

export default function GelatoScene() {
    const [fileBase64, setFileBase64] = useState<string>("")

    // The Magic all happens here.
    function convertFile(files: FileList | null) {
        if (files) {
            const fileRef = files[0] || ""
            const fileType: string = fileRef.type || ""
            console.log("This file upload is of type:", fileType)
            const reader = new FileReader()
            reader.readAsBinaryString(fileRef)
            reader.onload = (ev: any) => {
                // convert it to base64
                setFileBase64(`data:${fileType};base64,${btoa(ev.target.result)}`)
            }
        }
    }

    return (
        <>
            <Canvas gl={{ antialias: true }} dpr={[1, 1.5]} className="relative h-svh">
                <directionalLight position={[5, 5, 5]} intensity={10} />
                <Suspense fallback={<Loader />}>
                    <ScrollControls damping={0.5} pages={3}>
                        <GelatoModel uploadedTexture={fileBase64} />
                    </ScrollControls>
                </Suspense>
            </Canvas>

            <div className="absolute flex flex-col justify-center items-center transform -translate-x-1/2 -translate-y-1/2 top-3/4 left-1/2 ">
                {/* Button */}
                <div className="rgb-btn flex justify-center items-center rounded-lg px-0.5 py-0.5 ">
                    <input type="file" onChange={(e) => convertFile(e.target.files)} placeholder="Select File" />
                </div>
            </div>
        </>
    )
}
