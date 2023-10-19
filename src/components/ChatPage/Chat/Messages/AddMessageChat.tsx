import { useState } from 'react'
import TextArea from 'antd/es/input/TextArea'
import { Button } from 'antd'
import { useSelector } from 'react-redux'
import { sendMessage } from 'redux/chat.reducer'
import { AppRootStateType, useAppDispatch } from 'redux/store'

export const AddMessageChat = () => {

    const status = useSelector((state: AppRootStateType) => state.chat.status)

    const dispatch = useAppDispatch()
    const [message, setMessage] = useState('')


    const sendMessageHandler = () => {
        if (message) {
            dispatch(sendMessage(message))
            setMessage('')
        }
    }

    return (
        <div>
            <TextArea onChange={(e) => setMessage(e.currentTarget.value)} value={message} />
            <Button
                disabled={status !== 'ready'}
                type={'primary'} onClick={sendMessageHandler}>Send
                message</Button>
        </div>
    )
}