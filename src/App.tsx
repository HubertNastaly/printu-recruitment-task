import { useState } from "react"
import { useProject } from "./hooks"
import { Canva } from "./components"

const App = () => {
  const [projectId, setProjectId] = useState('')
  const { loadProject, fetchState, project } = useProject()

  return (
    <>
      <input value={projectId} onChange={event => setProjectId(event.target.value)} />
      <button onClick={() => loadProject(projectId)}>Load project</button>
      
      {fetchState.type === 'loading' && <span>Loading...</span>}
      {fetchState.type === 'error' && <span>Error: {fetchState.error.message}</span>}
      {fetchState.type === 'none' && <Canva project={project} />}
    </>
  )
}

export default App
