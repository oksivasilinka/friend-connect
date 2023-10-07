import { useEffect, useState } from 'react'
import { ws } from 'components/Chat/AddMessageChat'
import { ChatMessage } from 'components/Chat/Chat'
import { Message } from 'components/Chat/Message'

export const Messages = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([])
    useEffect(() => {
        ws.addEventListener('message', (e) => {
            setMessages((prevState) => [...prevState, ...JSON.parse(e.data)])
        })
    }, [])


    return (
        <div style={{ height: '1200px', overflowY: 'auto' }}>
            {messages?.map((message: any, index) => <Message key={index} message={message} />)}
        </div>
    )

}