import { Point, ProjectItem } from "../types"
import { toRadians } from "./toRadians"

export function calculateRectangleBoundingBox({ x, y, width, height, rotation }: ProjectItem) {
  const vertices = calculateRectangleVertices(x, y, width, height)
  const rotatedVertices = vertices.map(verticle => rotatePoint(verticle, [x, y], rotation))
  const xValues = rotatedVertices.map(([x]) => x)
  const yValues = rotatedVertices.map(([,y]) => y)

  return {
    xMin: Math.min(...xValues),
    yMin: Math.min(...yValues),
    xMax: Math.max(...xValues),
    yMax: Math.max(...yValues)
  }
}

type Vertices = [
  topLeft: Point,
  topRight: Point,
  bottomRight: Point,
  bottomLeft: Point
]

function calculateRectangleVertices(xCenter: number, yCenter: number, width: number, height: number): Vertices {
  const xLeft = xCenter - width / 2
  const xRight = xLeft + width
  const yTop = yCenter - height / 2
  const yBottom = yTop + height

  return [
    [xLeft, yTop],
    [xRight, yTop],
    [xRight, yBottom],
    [xLeft, yBottom]
  ]
}

function rotatePoint(point: Point, pivot: Point, degrees: number): Point {
  const vector: Point = [point[0] - pivot[0], point[1] - pivot[1]]

  const radians = toRadians(degrees)
  const sinus = Math.sin(radians)
  const cosinus = Math.cos(radians)

  const x = vector[0] * cosinus - vector[1] * sinus
  const y = vector[0] * sinus + vector[1] * cosinus

  return [x + pivot[0], y + pivot[1]]
}
