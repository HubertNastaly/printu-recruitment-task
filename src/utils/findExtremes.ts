import { Point } from "../types"

interface Extremes {
  xMin: number
  yMin: number
  xMax: number
  yMax: number
}

export function findExtremes(points: Point[]): Extremes {
  const extremes: Extremes = {
    xMin: Number.MAX_VALUE,
    yMin: Number.MAX_VALUE,
    xMax: Number.MIN_VALUE,
    yMax: Number.MIN_VALUE
  }

  points.forEach(([x, y]) => {
    extremes.xMin = Math.min(x, extremes.xMin),
    extremes.yMin = Math.min(y, extremes.yMin),
    extremes.xMax = Math.max(x, extremes.xMax),
    extremes.yMax = Math.max(y, extremes.yMax)
  })

  return extremes
}
