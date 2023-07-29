import {ActionTypes, DialogsPageType} from "./store";

const ADD_NEW_MESSAGE = 'ADD-NEW-MESSAGE';
const UPDATE_NEW_MESSAGE = 'UPDATE-NEW-MESSAGE'


export type AddNewMessageACType = ReturnType<typeof addNewMessageAC>
export type ChangeNewMessageType = ReturnType<typeof ChangeNewMessageAC>

let initialState: DialogsPageType =  {
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
}

export const dialogsReducer = (state: DialogsPageType = initialState, action: ActionTypes): DialogsPageType => {
    switch (action.type) {
        case ADD_NEW_MESSAGE:
            const newMessage = {
                id: new Date().getTime(),
                message: state.newMessageText,
            }
            state.messages.push(newMessage)
            state.newMessageText = ''
            return state
        case UPDATE_NEW_MESSAGE :
            state.newMessageText = action.messageText
            return state
        default:
            return state || initialState
    }
}

export const addNewMessageAC = (messageText: string) => ({
    type: ADD_NEW_MESSAGE,
    newMessageText: messageText
}) as const

export const ChangeNewMessageAC = (messageText: string) => ({
    type: UPDATE_NEW_MESSAGE,
    messageText: messageText
}) as const

