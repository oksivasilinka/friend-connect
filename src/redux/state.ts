import {AddPostActionType, profileReducer, UpdateNewPostTextActionType} from "./profileReducer";
import {AddNewMessageACType, ChangeNewMessageType, dialogsReducer} from "./dialogsReducer";
import {sidebarReducer} from "./sidebarReducer";

export type MessagesType = {
    id: number
    message: string
}

export type DialogsType = {
    id: number
    name: string
}

export type PostsType = {
    id?: number
    message: string
    likeCount: number
}

export type ProfilePageType = {
    posts: Array<PostsType>
    newPostText: string
}

export type DialogsPageType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
    newMessageText: string
}

export type SidebarType = {}

export type RootStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
    sidebar: SidebarType
}

export type StoreType = {
    _state: RootStateType,
    _callSubscriber: () => void,
    getState: () => RootStateType,
    subscribe: (observer: () => void) => void,
    dispatch: (action: ActionTypes) => void
}

export type ActionTypes = AddPostActionType | UpdateNewPostTextActionType | AddNewMessageACType | ChangeNewMessageType

export let store: StoreType = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'Hello', likeCount: 20},
                {id: 2, message: 'Hi', likeCount: 10},
                {id: 3, message: 'How are You', likeCount: 15},
            ],
            newPostText: ''
        },
        dialogsPage: {
            dialogs: [
                {id: 1, name: 'Oksana'},
                {id: 2, name: 'Vova'},
                {id: 3, name: 'Valera'},
                {id: 4, name: 'Masha'},
                {id: 5, name: 'Olya'},
            ],
            messages: [
                {id: 1, message: 'Hello'},
                {id: 2, message: 'Hi'},
                {id: 3, message: 'How are You'},
                {id: 4, message: 'nice'},
                {id: 5, message: 'ok'},
            ],
            newMessageText: ''
        },
        sidebar: {}
    },
    _callSubscriber() {
        console.log('state changed')
    },
    getState() {
        return this._state
    },
    subscribe(observer) {
        this._callSubscriber = observer
    },
    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._state.sidebar = sidebarReducer(this._state.sidebar, action)
        this._callSubscriber()
    }
}