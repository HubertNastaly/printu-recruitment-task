import { useState } from "react"
import { useProject } from "./hooks"
import { Canva } from "./components"
import './App.css'
import { ProjectState } from "./store"

const App = () => {
  const [projectId, setProjectId] = useState('')
  const { loadProject, projectState } = useProject()

  return (
    <div id="appWrapper">
      <div id="inputGroup">
        <input value={projectId} onChange={event => setProjectId(event.target.value)} placeholder="Project ID" />
        <button onClick={() => loadProject(projectId)}>Load project</button>
      </div>
      <StateHandler projectState={projectState} />
    </div>
  )
}

interface StateHandlerProps {
  projectState: ProjectState
}

const StateHandler = ({ projectState }: StateHandlerProps) => {
  switch(projectState.type) {
    case 'loading':
      return <span>Loading...</span>
    case 'error':
      return <span>Error: {projectState.error}</span>
    case 'ok':
      return projectState.project ? <Canva project={projectState.project} /> : <span>No project</span>
  }
}

export default App
