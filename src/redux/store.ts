import { Action, AnyAction, applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import { profileReducer } from './profileReducer'
import { sidebarReducer } from './sidebarReducer'
import { usersReducer } from './usersReducer'
import { authReducer } from './authReducer'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import { appReducer } from './appReducer'
import { chatReducer } from 'redux/chat.reducer'
import { useDispatch } from 'react-redux'


let rootReducer = combineReducers({
    profilePage: profileReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
    chat: chatReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export type InferActionsType<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppRootStateType, unknown, A>


export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>
export const useAppDispatch =  () => useDispatch<AppDispatch>()


// @ts-ignore
window.store = store