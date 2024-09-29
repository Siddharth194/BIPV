import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function ImageDisplayPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <header className="p-4 border-b border-gray-800">
        <nav>
          <Link href="/">
            <Button variant="ghost" className="text-white hover:text-blue-400 transition-colors">
              Back to Home
            </Button>
          </Link>
        </nav>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-semibold mb-4 text-center">Sample generated model</h2>
        <div className="relative w-full max-w-4xl aspect-[16/9]">
          <Image
            src="/screenshot.png"
            alt="Sample generated 3D city model"
            layout="fill"
            objectFit="contain"
            priority
          />
        </div>
      </main>

    </div>
  )
}