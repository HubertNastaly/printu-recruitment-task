import { useState } from "react"
import { useProject } from "./hooks"

const App = () => {
  const [projectId, setProjectId] = useState('')
  const { loadProject, isLoading, error } = useProject()

  return (
    <>
      <input value={projectId} onChange={event => setProjectId(event.target.value)} />
      <button onClick={() => loadProject(projectId)}>Load project</button>
      {isLoading && <span>Loading...</span>}
      {error && <span>Error: {error.message}</span>}
    </>
  )
}

export default App
