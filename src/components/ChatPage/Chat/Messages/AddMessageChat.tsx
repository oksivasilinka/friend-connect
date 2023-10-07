import { useState } from 'react'
import TextArea from 'antd/es/input/TextArea'
import { Button } from 'antd'

export const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

export const AddMessageChat = () => {
    const [message, setMessage] = useState('')

    const sendMessageHandler = () => {
        if (!message) return
        ws.send(message)
        setMessage('')
    }

    return (
        <div>
            <TextArea onChange={(e) => setMessage(e.currentTarget.value)} value={message} />
            <Button type={'primary'} onClick={sendMessageHandler}>Send message</Button>
        </div>
    )
}