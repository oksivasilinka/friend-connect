import { InferActionsType } from 'redux/store'

export type MessagesType = {
    id: number
    message: string
}
export type DialogsType = {
    id: number
    name: string
}

export type InitialStateType = typeof initialState
export type ActionTypes = InferActionsType<typeof dialogsActions>

let initialState = {
    dialogs: [
        { id: 1, name: 'Oksana' },
        { id: 2, name: 'Vova' },
        { id: 3, name: 'Valera' },
        { id: 4, name: 'Masha' },
        { id: 5, name: 'Olya' }
    ] as DialogsType[],
    messages: [
        { id: 1, message: 'Hello' },
        { id: 2, message: 'Hi' },
        { id: 3, message: 'How are You' },
        { id: 4, message: 'nice' },
        { id: 5, message: 'ok' }
    ] as MessagesType[]
}

export const dialogsReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'ADD_NEW_MESSAGE':
            const newMessage = { id: new Date().getTime(), message: action.newMessageText }
            return { ...state, messages: [...state.messages, newMessage] }
        default:
            return state || initialState
    }
}

export const dialogsActions = {
    addNewMessage: (newMessageText: string) => ({
        type: 'ADD_NEW_MESSAGE',
        newMessageText
    }) as const
}



