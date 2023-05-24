import { Project } from "../types"
import { getContrastColor } from "../utils/getContrastColor"
import { Pivot } from "./Pivot"
import { Shape } from "./Shape"

interface Props {
  project: Project
}

export const Canva = ({ project }: Props) => {
  const { id, name, items, width, height } = project
  return (
    <div id="canvaWrapper">
      <span id="projectName">{name} (id: { id })</span>
      <svg id="canva" viewBox={`0 0 ${width} ${height}`}>
        {items.map(shape => (
          <Shape key={shape.id} {...shape} />
        ))}
        {items.map(({ id, x, y, color, rotation }) => (
          <Pivot key={id} x={x} y={y} color={getContrastColor(color)} rotation={rotation}  />
        ))}
      </svg>
    </div>
  )
}
