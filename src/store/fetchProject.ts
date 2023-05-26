import { isProjectData, isProjectResponse } from "../types"

const API_URL = 'http://recruitment01.vercel.app/api'

export async function fetchProject(projectId: string) {
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

async function fetchRandomProjectId() {
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
