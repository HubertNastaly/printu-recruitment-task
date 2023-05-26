import { SliceCaseReducers, createAsyncThunk, createSlice, miniSerializeError } from "@reduxjs/toolkit";
import { Project } from "../types";
import { fetchProject } from "./fetchProject";

export const getProject = createAsyncThunk<Project, string>('project/getProject', async (projectId, { rejectWithValue }) => {
  try {
    return await fetchProject(projectId)
  } catch (error) {
    return rejectWithValue(miniSerializeError(error))
  }
})

export type ProjectState = {
  type: 'ok',
  project?: Project
} | {
  type: 'loading'
} | {
  type: 'error',
  error?: string
}

const projectSlice = createSlice<ProjectState, SliceCaseReducers<ProjectState>>({
  name: 'project',
  initialState: {
    type: 'ok'
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProject.pending, () => ({ type: 'loading' }))
      .addCase(getProject.rejected, (_, action) => ({ type: 'error', error: (action.payload as Error).message }))
      .addCase(getProject.fulfilled, (_, action) => ({ type: 'ok', project: action.payload }))
  }
})

export const projectReducer = projectSlice.reducer
