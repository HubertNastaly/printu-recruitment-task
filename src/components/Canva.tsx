import { Project } from "../schemas/project"
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
      </svg>
    </div>
  )
}
