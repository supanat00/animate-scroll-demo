import dynamic from "next/dynamic"
import Link from 'next/link'

const Scene = dynamic(() => import("@/components/Scene"), { ssr: false })

export default function Home() {
  return (
    <main className="h-full">
      <div className="relative w-full h-full">
        <Scene />
        <div className="absolute flex justify-center items-center transform -translate-x-1/2 -translate-y-1/2 top-2/3 left-1/2  ">
          {/* Button */}
          <div className="rgb-btn flex flex-col justify-center items-center rounded-lg px-0.5 py-0.5 ">
            <Link href="/gelato">
              <button className="text-xs text-center text-white font-Prompt bg-black px-8 py-2 mb-0.5 rounded-lg">Gelato Model</button>
            </Link>
            <Link href="/taus">
              <button className="text-xs text-center text-white font-Prompt bg-black px-8 py-2 rounded-lg">Taus Model</button>
            </Link>
          </div>

        </div>
      </div>
    </main>
  )
}
