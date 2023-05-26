import { configureStore } from "@reduxjs/toolkit"
import { ProjectState, projectReducer } from "./projectSlice"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"

type Store = ProjectState

export const store = configureStore({ reducer: projectReducer })

export const useTypedDispatch = () => useDispatch<typeof store.dispatch>()
export const useTypedSelector: TypedUseSelectorHook<Store> = useSelector
