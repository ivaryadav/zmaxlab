import dims from './image-dims.json'

const table = dims as unknown as Record<string, [number, number]>

/** Intrinsic width/height for a /public image, so the browser reserves its space (no layout shift). */
export function imgSize(src: string): { width?: number; height?: number } {
  const d = table[src]
  return d ? { width: d[0], height: d[1] } : {}
}
