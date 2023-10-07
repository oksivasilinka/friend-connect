import { Typography } from 'antd'
import { Messages } from 'components/ChatPage/Chat/Messages/Messages'
import { AddMessageChat } from 'components/ChatPage/Chat/Messages/AddMessageChat'

const { Title } = Typography

export type ChatMessage = {
    message: string
    photo: string
    userId: number
    userName: string

}

export const Chat = () => {

    return (
        <>
            <Title level={2}>Messages</Title>
            <Messages />
            <AddMessageChat />
        </>
    )
}



