import { useId } from "react"
import { useEffect, useState } from "react"
import Particles, { initParticlesEngine } from "@tsparticles/react"
import type { Container } from "@tsparticles/engine"
import { loadSlim } from "@tsparticles/slim"
import { cn } from "@/lib/utils"
import { motion, useAnimation } from "framer-motion"

type SparklesProps = {
  id?: string
  className?: string
  background?: string
  minSize?: number
  maxSize?: number
  speed?: number
  particleColor?: string
  particleDensity?: number
}

export function SparklesCore({
  id,
  className,
  background = "transparent",
  minSize = 0.6,
  maxSize = 1.4,
  speed = 1,
  particleColor = "#ffffff",
  particleDensity = 100,
}: SparklesProps) {
  const [init, setInit] = useState(false)
  const controls = useAnimation()
  const generatedId = useId()

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => setInit(true))
  }, [])

  const particlesLoaded = async (container?: Container) => {
    if (container) {
      await controls.start({ opacity: 1, transition: { duration: 1 } })
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={controls} className={cn("h-full w-full", className)}>
      {init && (
        <Particles
          id={id ?? generatedId}
          className="h-full w-full"
          particlesLoaded={particlesLoaded}
          options={{
            fullScreen: { enable: false },
            background: { color: { value: background } },
            fpsLimit: 60,
            particles: {
              color: { value: particleColor },
              move: {
                enable: true,
                direction: "none",
                outModes: { default: "out" },
                speed: { min: 0.1, max: speed },
                random: true,
                straight: false,
              },
              number: {
                value: particleDensity,
                density: { enable: true, width: 400, height: 400 },
              },
              opacity: {
                value: { min: 0.1, max: 0.8 },
                animation: { enable: true, speed: 1, sync: false },
              },
              size: {
                value: { min: minSize, max: maxSize },
              },
              shape: { type: "circle" },
            },
            detectRetina: true,
            interactivity: {
              events: {
                onClick: { enable: false },
                onHover: { enable: false },
              },
            },
          }}
        />
      )}
    </motion.div>
  )
}
