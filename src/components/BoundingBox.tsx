import { useMemo } from "react"
import { ProjectItem } from "../types"
import { calculateRectangleVertices, rotatePoint } from "../utils"

interface Props {
  shape: ProjectItem
}

export const BoundingBox = ({ shape }: Props) => {
  switch(shape.type) {
    case 'rectangle':
      return <RectangleBoundingBox shape={shape} />
    case 'ellipse':
      return <></>
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
