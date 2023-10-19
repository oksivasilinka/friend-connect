import { Typography } from 'antd'
import { Messages } from 'components/ChatPage/Chat/Messages/Messages'
import { AddMessageChat } from 'components/ChatPage/Chat/Messages/AddMessageChat'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { startMessagesListening, stopMessagesListening } from 'redux/chat.reducer'
import { AppRootStateType, useAppDispatch } from 'redux/store'

const { Title } = Typography

export const Chat = () => {

    const dispatch = useAppDispatch()
    const status = useSelector((state: AppRootStateType) => state.chat.status)

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return (
        <>

            <Title level={2}>Messages</Title>

            {status === 'error' && <div style={{color: 'red'}}>Some error occurred</div>}

            <Messages />
            <AddMessageChat />
        </>
    )
}



