
const ADD_NEW_MESSAGE = 'ADD-NEW-MESSAGE';
const UPDATE_NEW_MESSAGE = 'UPDATE-NEW-MESSAGE'


export type MessagesType = {
    id: number
    message: string
}
export type DialogsType = {
    id: number
    name: string
}

export type AddNewMessageACType = ReturnType<typeof addNewMessageAC>
export type ChangeNewMessageType = ReturnType<typeof ChangeNewMessageAC>
export type InitialStateType = typeof initialState
export type ActionTypes = AddNewMessageACType | ChangeNewMessageType

let initialState =  {
    dialogs: [
        {id: 1, name: 'Oksana'},
        {id: 2, name: 'Vova'},
        {id: 3, name: 'Valera'},
        {id: 4, name: 'Masha'},
        {id: 5, name: 'Olya'},
    ] as Array<DialogsType>,
    messages: [
        {id: 1, message: 'Hello'},
        {id: 2, message: 'Hi'},
        {id: 3, message: 'How are You'},
        {id: 4, message: 'nice'},
        {id: 5, message: 'ok'},
    ] as Array<MessagesType>,
    newMessageText: ''
}

export const dialogsReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case ADD_NEW_MESSAGE:
            const newMessage = {
                id: new Date().getTime(),
                message: state.newMessageText,
            }
            return {
                ...state,
                messages: [...state.messages, newMessage],
                newMessageText: ''
            };
        case UPDATE_NEW_MESSAGE :
            return {
                ...state,
                newMessageText: action.messageText
            };
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

