import { useEffect, useState } from 'react'
import { ChatMessage } from 'components/ChatPage/Chat/Chat'
import { Message } from 'components/ChatPage/Chat/Messages/Message/Message'
import s from './Messages.module.css'

type Props = {
    wsChanel: WebSocket | null
}

export const Messages = ({wsChanel}: Props) => {

    const [messages, setMessages] = useState<ChatMessage[]>([])

    useEffect(() => {
        const messageHandler =  (e: MessageEvent) => {
            setMessages((prevState) => [...prevState, ...JSON.parse(e.data)])
        }
        wsChanel?.addEventListener('message', messageHandler)

        return ()=> {
            wsChanel?.addEventListener('message', messageHandler )
        }
    }, [wsChanel])

    return (
        <div className={s.messagesBlock}>
            {messages?.map((message: any, index) => <Message key={index} message={message} />)}
        </div>
    )

}