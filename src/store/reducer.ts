import { PayloadAction } from "@reduxjs/toolkit";
import { Project } from "../types";

export interface Store {
  project?: Project
}

export const DEFAULT_STATE: Store = {}

export type SetProjectAction = PayloadAction<Project, 'SET_PROJECT'>

export function reducer(state: Store = DEFAULT_STATE, action: SetProjectAction): Store {
  switch(action.type) {
    case 'SET_PROJECT':
      return { project: action.payload }
    default:
      return state
  }
}
