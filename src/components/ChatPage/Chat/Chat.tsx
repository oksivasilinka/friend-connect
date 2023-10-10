import { Typography } from 'antd'
import { Messages } from 'components/ChatPage/Chat/Messages/Messages'
import { AddMessageChat } from 'components/ChatPage/Chat/Messages/AddMessageChat'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { startMessagesListening, stopMessagesListening } from 'redux/chat.reducer'

const { Title } = Typography

export const Chat = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return (
        <>
            <Title level={2}>Messages</Title>
            <Messages
            />
            <AddMessageChat
            />
        </>
    )
}



