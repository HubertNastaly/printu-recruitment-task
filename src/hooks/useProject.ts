import { useCallback, useState } from "react";

const API_URL = 'http://recruitment01.vercel.app/api'

export function useProject() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error>()

  const loadProject = useCallback((projectId: string) => {
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
    const project = await response.json()
    // TODO: parse project
    return project
  }
  throw responseError(response)
}

async function fetchRandomProjectId(): Promise<string> {
  const response = await fetch(`${API_URL}/init`)
  if(response.ok) {
    return (await response.json()).id as string
  }
  throw responseError(response)
}

const responseError = (response: Response) => new Error(`Response status: ${response.status} (${response.statusText})`)
