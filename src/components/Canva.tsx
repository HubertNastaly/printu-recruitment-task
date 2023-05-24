import { Project } from "../schemas/project"

interface Props {
  project: Project
}

export const Canva = ({ project }: Props) => {
  const { name } = project
  return (
    <div id="canva">
      <span id="projectName">{name}</span>
      <svg>

      </svg>
    </div>
  )
}
