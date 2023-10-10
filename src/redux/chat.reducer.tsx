import { BaseThunkType, InferActionsType } from './store'
import { FormAction } from 'redux-form'
import { chatApi, ChatMessage } from 'api/chat.api'
import { Dispatch } from 'redux'

let initialState = {
    messages: [] as ChatMessage[]
}

export const chatReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'SET_MESSAGES' :
            return { ...state, messages: [...state.messages, ...action.payload.messages] }

        default:
            return state || initialState
    }
}

export const chatActions = {
    setMessages: (messages: ChatMessage[]) => ({ type: 'SET_MESSAGES', payload: { messages } }) as const
}


let _newMessageHandler: ((messages: ChatMessage[]) => void) | null = null

const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(chatActions.setMessages(messages))
        }
    }

    return _newMessageHandler
}

export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatApi.start()
    chatApi.subscribe(newMessageHandlerCreator(dispatch))
}

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatApi.unsubscribe(newMessageHandlerCreator(dispatch))
    chatApi.stop()
}

export const sendMessage = (message: string): ThunkType => async () => {
    chatApi.sendMessage(message)
}


type InitialStateType = typeof initialState
export type ActionTypes = InferActionsType<typeof chatActions>
type ThunkType = BaseThunkType<ActionTypes | FormAction>

