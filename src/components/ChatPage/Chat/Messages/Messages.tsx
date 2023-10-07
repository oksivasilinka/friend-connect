import { useEffect, useState } from 'react'
import { ws } from 'components/ChatPage/Chat/Messages/AddMessageChat'
import { ChatMessage } from 'components/ChatPage/Chat/Chat'
import { Message } from 'components/ChatPage/Chat/Messages/Message/Message'
import s from './Messages.module.css'

export const Messages = () => {

    const [messages, setMessages] = useState<ChatMessage[]>([])

    useEffect(() => {
        ws.addEventListener('message', (e) => {
            setMessages((prevState) => [...prevState, ...JSON.parse(e.data)])
        })
    }, [])

    return (
        <div className={s.messagesBlock}>
            {messages?.map((message: any, index) => <Message key={index} message={message} />)}
        </div>
    )

}