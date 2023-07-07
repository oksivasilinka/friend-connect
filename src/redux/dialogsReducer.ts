import {ActionTypes, DialogsPageType} from "./state";

const ADD_NEW_MESSAGE = 'ADD-NEW-MESSAGE';
const UPDATE_NEW_MESSAGE = 'UPDATE-NEW-MESSAGE'

export type AddNewMessageACType = ReturnType<typeof addNewMessageAC>
export type ChangeNewMessageType = ReturnType<typeof ChangeNewMessageAC>

export const dialogsReducer = (state: DialogsPageType, action: ActionTypes): DialogsPageType => {
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
            return state
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

