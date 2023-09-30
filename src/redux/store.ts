import { Action, applyMiddleware, combineReducers, createStore } from 'redux'
import { profileReducer } from './profileReducer'
import { dialogsReducer } from './dialogsReducer'
import { sidebarReducer } from './sidebarReducer'
import { usersReducer } from './usersReducer'
import { authReducer } from './authReducer'
import thunk, { ThunkAction } from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import { appReducer } from './appReducer'


let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export type InferActionsType<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppRootStateType, unknown, A>


// @ts-ignore
window.store = store