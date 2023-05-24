import { Project } from "../schemas/project"

interface Props {
  project?: Project
}

export const Canva = ({ project }: Props) => {
  return project ? <span>{project.name}</span> : <span>No project</span>
}
