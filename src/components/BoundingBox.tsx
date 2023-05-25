import { useMemo } from "react"
import { ProjectItem } from "../types"
import { calculateRectangleVertices, rotatePoint } from "../utils"
import { toRadians } from "../utils/toRadians"

interface Props {
  shape: ProjectItem
}

export const BoundingBox = ({ shape }: Props) => {
  switch(shape.type) {
    case 'rectangle':
      return <RectangleBoundingBox shape={shape} />
    case 'ellipse':
      return <EllipseBoundingBox shape={shape} />
  }
}

const RectangleBoundingBox = ({ shape }: Props) => {
  const { color } = shape
  const { xMin, xMax, yMin, yMax } = useMemo(() => calculateRectangleBoundingBox(shape), [shape])

  return (
    <rect
      x={xMin}
      y={yMin}
      width={xMax - xMin}
      height={yMax - yMin}
      fill="none"
      strokeWidth={1}
      stroke={color}
    />
  )
}

function calculateRectangleBoundingBox({ x, y, width, height, rotation }: ProjectItem) {
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

const EllipseBoundingBox = ({ shape }: Props) => {
  const { color } = shape
  const { xMin, xMax, yMin, yMax } = useMemo(() => calculateEllipseBoundingBox(shape), [shape])

  return (
    <rect
      x={xMin}
      y={yMin}
      width={xMax - xMin}
      height={yMax - yMin}
      fill="none"
      strokeWidth={1}
      stroke={color}
    />
  )
}

function calculateEllipseBoundingBox({ x: xCenter, y: yCenter, width, height, rotation }: ProjectItem) {
  const { sin, cos, tan, atan, PI } = Math
  const rotationInRadians = toRadians(rotation)

  const xRadius = width / 2
  const yRadius = height / 2

  const sinRotation = sin(rotationInRadians)
  const cosRotation = cos(rotationInRadians)

  // https://en.wikipedia.org/wiki/Ellipse, look: Standard parametric representation
  // xRotated(t) = x(t) * cos(rotation) - y(t) * sin(rotation)
  // xRotated(t) = xRadius * cos(rotation) * cos(t) - yRadius * sin(rotation) * sin(t)
  const xRotated = (radians: number) => xRadius * cosRotation * cos(radians) - yRadius * sinRotation * sin(radians)
  const yRotated = (radians: number) => xRadius * sinRotation * cos(radians) + yRadius * cosRotation * sin(radians)

  // xRotated'(t) = -xRadius * cos(rotation) sin(t) - yRadius * sin(rotation) * cos(t)
  // xRotated'(t) = 0  =>  tg(t) = -(yRadius / xRadius) * tg(rotation)
  const xExtremeAngle = atan(-yRadius / xRadius * tan(rotationInRadians))
  const yExtremeAngle = atan(yRadius / xRadius / tan(rotationInRadians))

  const [xMin, xMax] = [xRotated(xExtremeAngle), xRotated(xExtremeAngle + PI)].map(x => x + xCenter).sort()
  const [yMin, yMax] = [yRotated(yExtremeAngle), yRotated(yExtremeAngle + PI)].map(y => y + yCenter).sort()

  return {
    xMin,
    yMin,
    xMax,
    yMax
  }
}
