import { useCallback, useState } from "react";
import { isProjectResponse, isProjectData } from "../types";
import { useAppDispatch, useAppSelector } from "../store";

const API_URL = 'http://recruitment01.vercel.app/api'

type FetchState = {
  type: 'none'
} | {
  type: 'loading'
} | {
  type: 'error',
  error: Error
}

export function useProject() {
  const dispatch = useAppDispatch()
  const project = useAppSelector(({ project }) => project)
  const [fetchState, setFetchState] = useState<FetchState>({ type: 'none' })

  const loadProject = useCallback((projectId: string) => {
    setFetchState({ type: 'loading' })

    fetchProject(projectId)
      .then((project) => {
        dispatch({ type: 'SET_PROJECT', payload: project })
        setFetchState({ type: 'none' })
      })
      .catch(error => setFetchState({ type: 'error', error }))
  }, [setFetchState, dispatch])

  return { loadProject, fetchState, project }
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
