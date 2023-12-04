import { Chat } from 'components/ChatPage/Chat/Chat'
import { Typography } from 'antd'

const { Title } = Typography

const ChatPage = () => {
    return (
        <>
            <Title level={2}>Messages</Title>
            <Chat />
        </>
    )
}

export default ChatPage