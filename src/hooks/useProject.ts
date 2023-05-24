import { useCallback, useState } from "react";
import { isProjectResponse, isProjectData } from "../schemas";

const API_URL = 'http://recruitment01.vercel.app/api'

export function useProject() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error>()

  const loadProject = useCallback((projectId: string) => {
    setError(undefined)
    setIsLoading(true)

    fetchProject(projectId)
      .then((project) => console.log(project))
      .catch(error => setError(error))
      .finally(() => setIsLoading(false))
  }, [setIsLoading, setError])

  return { loadProject, isLoading, error }
}

async function fetchProject (projectId: string) {
  projectId ||= await fetchRandomProjectId()
  const response = await fetch(`${API_URL}/project/${projectId}`)
  if(response.ok) {
    const parsedResponse = await response.json()
    if(!isProjectResponse(parsedResponse)) {
      throw new Error(`Invalid response format for project: ${projectId}`)
    }
    return parsedResponse.project
  }
  throw responseError(response)
}

async function fetchRandomProjectId(): Promise<string> {
  const response = await fetch(`${API_URL}/init`)
  if(response.ok) {
    const parsedResponse = await response.json()
    if(!isProjectData(parsedResponse)) {
      throw new Error('Invalid response format')
    }
    return parsedResponse.id
  }
  throw responseError(response)
}

const responseError = (response: Response) => new Error(`Response status: ${response.status} (${response.statusText})`)
