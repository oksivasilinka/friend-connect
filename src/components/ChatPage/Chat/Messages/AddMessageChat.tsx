import { useEffect, useState } from 'react'
import TextArea from 'antd/es/input/TextArea'
import { Button } from 'antd'

type Props = {
    wsChanel: WebSocket | null
}


export const AddMessageChat = ({wsChanel}: Props) => {
    const [message, setMessage] = useState('')
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')

    useEffect(() => {
        const openHandler = () => {
            setReadyStatus('ready')
        }

        wsChanel?.addEventListener('open', openHandler)
        return () => {
            wsChanel?.removeEventListener('open', openHandler)
        }
    }, [wsChanel])

    const sendMessageHandler = () => {
        if (!message) return
        wsChanel?.send(message)
        setMessage('')
    }

    return (
        <div>
            <TextArea onChange={(e) => setMessage(e.currentTarget.value)} value={message} />
            <Button disabled={wsChanel !== null && readyStatus !== 'ready'} type={'primary'} onClick={sendMessageHandler}>Send
                message</Button>
        </div>
    )
}