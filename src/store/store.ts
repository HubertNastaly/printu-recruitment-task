import { Dispatch, configureStore } from "@reduxjs/toolkit"
import { SetProjectAction, DEFAULT_STATE, Store, reducer } from "./reducer"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"

export const store = configureStore({
  preloadedState: DEFAULT_STATE,
  reducer
})

export const useAppDispatch: () => Dispatch<SetProjectAction> = useDispatch
export const useAppSelector: TypedUseSelectorHook<Store> = useSelector
