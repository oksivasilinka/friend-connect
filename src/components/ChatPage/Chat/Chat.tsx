import { Typography } from 'antd'
import { Messages } from 'components/ChatPage/Chat/Messages/Messages'
import { AddMessageChat } from 'components/ChatPage/Chat/Messages/AddMessageChat'
import { useEffect, useState } from 'react'

const { Title } = Typography

export type ChatMessage = {
    message: string
    photo: string
    userId: number
    userName: string

}

export const Chat = () => {
    const [wsChanel, setWsChanel] = useState<WebSocket | null>(null)

    useEffect(() => {

        let ws: WebSocket

        const closeHandler = () => {
            setTimeout(createWsChanel, 3000)
        }

        const createWsChanel = () => {
                ws?.removeEventListener('close', closeHandler)
                ws?.close()

            ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
            ws.addEventListener('close', closeHandler)
            setWsChanel(ws)
        }

        createWsChanel()

        return () => {
            ws.removeEventListener('close', closeHandler)
            ws.close()
        }

    }, [])

    return (
        <>
            <Title level={2}>Messages</Title>
            <Messages wsChanel={wsChanel} />
            <AddMessageChat wsChanel={wsChanel} />
        </>
    )
}



