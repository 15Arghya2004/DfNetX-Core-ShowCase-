import { useEffect, useRef } from 'react'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  r: number
}

type Pulse = {
  index: number
  start: number
}

const MAX_LINK_DIST = 150
const PULSE_DURATION = 900
const PULSE_INTERVAL = [500, 1400] as const

/**
 * Self-contained canvas animation: a slowly drifting constellation of nodes,
 * connected by lines when close enough, with occasional bright "detection"
 * pulses on random nodes. Pure black/white -- no external video asset.
 */
export default function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    let particles: Particle[] = []
    let pulses: Pulse[] = []
    let nextPulseAt = 0
    let rafId = 0

    function resize() {
      const parent = canvas!.parentElement
      if (!parent) return
      width = parent.clientWidth
      height = parent.clientHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas!.width = width * dpr
      canvas!.height = height * dpr
      canvas!.style.width = `${width}px`
      canvas!.style.height = `${height}px`
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)

      const density = 16000
      const count = Math.max(40, Math.min(110, Math.floor((width * height) / density)))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.2 + 1,
      }))
    }

    function scheduleNextPulse(now: number) {
      const [min, max] = PULSE_INTERVAL
      nextPulseAt = now + min + Math.random() * (max - min)
    }

    function step(now: number) {
      if (!nextPulseAt) scheduleNextPulse(now)
      if (now >= nextPulseAt && particles.length > 0) {
        pulses.push({ index: Math.floor(Math.random() * particles.length), start: now })
        scheduleNextPulse(now)
      }
      pulses = pulses.filter((p) => now - p.start < PULSE_DURATION)

      ctx!.clearRect(0, 0, width, height)

      // update + draw links
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1
        p.x = Math.max(0, Math.min(width, p.x))
        p.y = Math.max(0, Math.min(height, p.y))
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MAX_LINK_DIST) {
            const alpha = (1 - dist / MAX_LINK_DIST) * 0.35
            ctx!.strokeStyle = `rgba(255,255,255,${alpha})`
            ctx!.lineWidth = 1
            ctx!.beginPath()
            ctx!.moveTo(a.x, a.y)
            ctx!.lineTo(b.x, b.y)
            ctx!.stroke()
          }
        }
      }

      // draw nodes
      for (const p of particles) {
        ctx!.beginPath()
        ctx!.fillStyle = 'rgba(255,255,255,0.55)'
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx!.fill()
      }

      // draw pulses (bright, glowing "detection" flashes)
      for (const pulse of pulses) {
        const p = particles[pulse.index]
        if (!p) continue
        const t = (now - pulse.start) / PULSE_DURATION
        const ease = Math.sin(t * Math.PI)
        const ringR = p.r + ease * 22
        ctx!.beginPath()
        ctx!.strokeStyle = `rgba(255,255,255,${ease * 0.5})`
        ctx!.lineWidth = 1.5
        ctx!.arc(p.x, p.y, ringR, 0, Math.PI * 2)
        ctx!.stroke()

        ctx!.beginPath()
        ctx!.fillStyle = `rgba(255,255,255,${0.6 + ease * 0.4})`
        ctx!.shadowColor = 'rgba(255,255,255,0.9)'
        ctx!.shadowBlur = 12
        ctx!.arc(p.x, p.y, p.r + ease * 1.5, 0, Math.PI * 2)
        ctx!.fill()
        ctx!.shadowBlur = 0
      }

      rafId = requestAnimationFrame(step)
    }

    resize()
    rafId = requestAnimationFrame(step)
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
}
