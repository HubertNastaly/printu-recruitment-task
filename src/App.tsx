import { useState } from "react"
import { useProject } from "./hooks"
import { Canva } from "./components"
import './App.css'

const App = () => {
  const [projectId, setProjectId] = useState('')
  const { loadProject, fetchState, project } = useProject()

  return (
    <div id="appWrapper">
      <div id="inputGroup">
        <input value={projectId} onChange={event => setProjectId(event.target.value)} placeholder="Project ID" />
        <button onClick={() => loadProject(projectId)}>Load project</button>
      </div>
      
      {fetchState.type === 'loading' && <span>Loading...</span>}
      {fetchState.type === 'error' && <span>Error: {fetchState.error.message}</span>}
      {fetchState.type === 'none' && (
        project ? <Canva project={project} /> : <span>No project</span>
      )}
    </div>
  )
}

export default App
