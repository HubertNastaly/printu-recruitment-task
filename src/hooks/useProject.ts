import { useCallback } from "react";
import { getProject, useTypedDispatch, useTypedSelector } from "../store";

export function useProject() {
  const dispatch = useTypedDispatch()
  const projectState = useTypedSelector(projectState => projectState)

  const loadProject = useCallback((projectId: string) => {
    dispatch(getProject(projectId))
  }, [dispatch])

  return { loadProject, projectState }
}
