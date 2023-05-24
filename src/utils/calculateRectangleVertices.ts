import { Point } from "../types";

type Vertices = [
  topLeft: Point,
  topRight: Point,
  bottomRight: Point,
  bottomLeft: Point
]

export function calculateRectangleVertices(xCenter: number, yCenter: number, width: number, height: number): Vertices {
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
