import { useState } from "react"
import { useProject } from "./hooks"
import { Canva } from "./components"
import './App.css'

const App = () => {
  const [projectId, setProjectId] = useState('')
  const { loadProject, projectState } = useProject()

  return (
    <div id="appWrapper">
      <div id="inputGroup">
        <input value={projectId} onChange={event => setProjectId(event.target.value)} placeholder="Project ID" />
        <button onClick={() => loadProject(projectId)}>Load project</button>
      </div>
      
      {projectState.type === 'loading' && <span>Loading...</span>}
      {projectState.type === 'error' && <span>Error: {projectState.error}</span>}
      {projectState.type === 'ok' && (
        projectState.project ? <Canva project={projectState.project} /> : <span>No project</span>
      )}
    </div>
  )
}

export default App
