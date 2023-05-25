import { useMemo } from "react"
import { ProjectItem } from "../types"
import { calculateEllipseBoundingBox, calculateRectangleBoundingBox } from "../utils"

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
