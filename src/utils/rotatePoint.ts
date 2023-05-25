import { Point } from "../types"

export function rotatePoint(point: Point, pivot: Point, degrees: number): Point {
  const vector: Point = [point[0] - pivot[0], point[1] - pivot[1]]

  const radians = degrees * Math.PI / 180
  const sinus = Math.sin(radians)
  const cosinus = Math.cos(radians)

  const x = vector[0] * cosinus - vector[1] * sinus
  const y = vector[0] * sinus + vector[1] * cosinus

  return [x + pivot[0], y + pivot[1]]
}
