import { Point } from "../types"

export function rotatePoint(point: Point, pivot: Point, degrees: number): Point {
  const vectorX = point[0] - pivot[0]
  const vectorY = point[1] - pivot[1]

  const radians = degrees * Math.PI / 180
  const sinus = Math.sin(radians)
  const cosinus = Math.cos(radians)

  const x = vectorX * cosinus - vectorY * sinus
  const y = vectorX * sinus + vectorY * cosinus

  return [x + pivot[0], y + pivot[1]]
}
