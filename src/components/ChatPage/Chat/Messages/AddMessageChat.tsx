import { useState } from 'react'
import TextArea from 'antd/es/input/TextArea'
import { Button } from 'antd'
import { useDispatch } from 'react-redux'
import { sendMessage } from 'redux/chat.reducer'

export const AddMessageChat = () => {

    const dispatch = useDispatch()
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
                type={'primary'} onClick={sendMessageHandler}>Send
                message</Button>
        </div>
    )
}