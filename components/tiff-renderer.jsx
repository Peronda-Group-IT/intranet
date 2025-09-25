'use client'

import UTIF from '@/lib/UTIF'
import { useEffect, useRef } from 'react'


export default function TiffViewer({ src, width = 600, height = 400 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!src) return

    // Fetch the TIFF file as ArrayBuffer
    fetch(src)
      .then(res => res.arrayBuffer())
      .then(buffer => {
        // Decode the TIFF
        const ifds = UTIF.decode(buffer)
        UTIF.decodeImage(buffer, ifds[0])
        const rgba = UTIF.toRGBA8(ifds[0])

        // Draw on canvas
        const canvas = canvasRef.current
        canvas.width = ifds[0].width
        canvas.height = ifds[0].height
        const ctx = canvas.getContext('2d')
        const imgData = ctx.createImageData(ifds[0].width, ifds[0].height)
        imgData.data.set(rgba)
        ctx.putImageData(imgData, 0, 0)
      })
      .catch(err => console.error('Error loading TIFF:', err))
  }, [src])

  return <canvas ref={canvasRef} style={{ width, height }} />
}
