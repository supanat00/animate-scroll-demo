import dynamic from "next/dynamic"
import Link from 'next/link'

const GelatoScene = dynamic(() => import("@/components/GelatoScene"), { ssr: false })

export default function Gelato() {
    return (
        <main className="h-full">
            <div className="relative w-full h-full">
                <GelatoScene />
                <div className="absolute flex justify-center items-center transform -translate-x-1/2 -translate-y-1/2 top-2/3 left-1/2 border bg-slate-100">
                    {/* Button */}
                    <div className="rgb-btn flex justify-center items-center rounded-lg px-0.5 py-0.5 ">
                        <Link href="/">
                            <button className="text-xs text-center text-white font-Prompt bg-black px-8 py-2 rounded-lg">Robot Model</button>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    )
}
