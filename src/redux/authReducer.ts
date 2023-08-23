import {Dispatch} from "redux";
import {usersAPI} from "../api/api";
import {AppRootStateType} from "./store";
import {ThunkDispatch} from "redux-thunk";

const SET_USER_DATA = 'SET-USER-DATA';
const LOGOUT_USER_DATA = 'LOGOUT_USER_DATA';

type setUserDataType = ReturnType<typeof setUserData>
type logOutUserType = ReturnType<typeof logOutUser>
type InitialStateType = typeof initialState
type ActionTypes = setUserDataType | logOutUserType

export type DataType = {
    id: any
    login: any
    email: any
    isAuth: boolean
}

let initialState = {
    id: null,
    login: null,
    email: null,
    isAuth: false
}

export const authReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA :
            return {...state, ...action.data, isAuth: true}
        case LOGOUT_USER_DATA :
            return {...state, ...action.data, isAuth: false}
        default:
            return state || initialState
    }
}

const setUserData = (data: DataType) => ({type: SET_USER_DATA, data }) as const
const logOutUser = (data: DataType) => ({type: LOGOUT_USER_DATA, data}) as const

export const getAuthMe = () => (dispatch: Dispatch) => {
    usersAPI.getAuthMe()
        .then((res) => {
        if (res.data.resultCode === 0) {
            dispatch(setUserData(res.data.data))
        }
    });
}

export const login = (email: string, password: string, rememberMe: boolean = true) => (dispatch: ThunkDispatch<AppRootStateType, unknown, ActionTypes>) => {
    usersAPI.loginUser(email, password, rememberMe)
        .then((res) => {
        if (res.data.resultCode === 0) {
            dispatch(getAuthMe())
        }
    });
}

export const logOut = () => (dispatch: Dispatch) => {
    usersAPI.logOut()
        .then((res) => {
        if (res.data.resultCode === 0) {
            dispatch(logOutUser({id: null,
                login: null,
                email: null,
                isAuth: false}))
        }
    });
}