import { Typography } from 'antd'
import { Messages } from 'components/Chat/Messages'
import { AddMessageChat } from 'components/Chat/AddMessageChat'

const { Title } = Typography


export type ChatMessage = {
    message: string
    photo: string
    userId: number
    userName: string

}

export const Chat = () => {

    return (
        <div>
            <Title level={2}>Messages</Title>
            <Messages />
            <AddMessageChat />
        </div>
    )
}



