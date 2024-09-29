'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building2, Menu, Sun } from "lucide-react"
import Link from "next/link"
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, Environment } from '@react-three/drei'
import * as THREE from 'three'

function Globe() {
  const meshRef = useRef<THREE.Mesh>(null)
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2
    }
  })

  return (
    <Sphere args={[3, 128, 128]} ref={meshRef}>
      <meshStandardMaterial color="#4287f5" wireframe />
    </Sphere>
  )
}

export default function Component() {
  const [cityName, setCityName] = useState('')
  const [timeOfDay, setTimeOfDay] = useState('')
  const [month, setMonth] = useState('')
  const [ghi, setGhi] = useState('')
  const router = useRouter()

  const generateCity = (e: React.FormEvent) => {
    e.preventDefault()
    const queryParams = new URLSearchParams({
      cityName,
      timeOfDay,
      month,
      ghi
    }).toString()
    router.push(`/model?${queryParams}`)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <main className="flex-1">
        <section className="w-full py-6 md:py-8 lg:py-8 xl:py-10">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                     Get the accurate Building-Integrated Photovoltaic Potential calculations of a City
                  </h1>
                </div>
                <div className="w-full max-w-sm space-y-2 mx-auto">
                  <form onSubmit={generateCity} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="city-name">City Name</Label>
                      <Input
                        id="city-name"
                        placeholder="Enter city name"
                        value={cityName}
                        onChange={(e) => setCityName(e.target.value)}
                        required
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time-of-day">Time of Day</Label>
                      <Select value={timeOfDay} onValueChange={setTimeOfDay} required>
                        <SelectTrigger id="time-of-day" className="bg-gray-800 border-gray-700 text-white">
                          <SelectValue placeholder="Select time of day" />
                        </SelectTrigger>
                        <SelectContent className="!bg-white border-gray-700 text-white">
                          <SelectItem value="morning">Morning</SelectItem>
                          <SelectItem value="noon">Noon</SelectItem>
                          <SelectItem value="evening">Evening</SelectItem>
                          <SelectItem value="night">Night</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="month">Month</Label>
                      <Select value={month} onValueChange={setMonth} required>
                        <SelectTrigger id="month" className="bg-gray-800 border-gray-700 text-white">
                          <SelectValue placeholder="Select month" />
                        </SelectTrigger>
                        <SelectContent className="!bg- border-gray-700 text-white">
                          <SelectItem value="1">January</SelectItem>
                          <SelectItem value="2">February</SelectItem>
                          <SelectItem value="3">March</SelectItem>
                          <SelectItem value="4">April</SelectItem>
                          <SelectItem value="5">May</SelectItem>
                          <SelectItem value="6">June</SelectItem>
                          <SelectItem value="7">July</SelectItem>
                          <SelectItem value="8">August</SelectItem>
                          <SelectItem value="9">September</SelectItem>
                          <SelectItem value="10">October</SelectItem>
                          <SelectItem value="11">November</SelectItem>
                          <SelectItem value="12">December</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ghi">GHI Constant</Label>
                      <Input
                        id="ghi"
                        type="number"
                        placeholder="Enter GHI constant"
                        value={ghi}
                        onChange={(e) => setGhi(e.target.value)}
                        required
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full text-white !hover:bg-blue-700"
                      style={{
                        backgroundColor: '#2563eb',
                        color: 'white',
                      }}
                    >
                      Generate 3D Model
                    </Button>
                  </form>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-full aspect-square max-w-md">
                  <Canvas>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} />
                    <Globe />
                    <OrbitControls enableZoom={false} />
                    <Environment preset="city" />
                  </Canvas>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}