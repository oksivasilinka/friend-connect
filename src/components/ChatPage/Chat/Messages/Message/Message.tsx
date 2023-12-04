import { Avatar } from 'antd'
import s from './Message.module.css'
import React from 'react'
import { ChatMessageApi } from 'redux/chat.reducer'

type Props = {
    message: ChatMessageApi
}


export const Message = React.memo(({ message }: Props) => {

    return (
        <div className={s.messageCard}>
            <Avatar size={'large'} src={message.photo} />
            <span className={s.name}>{message.userName}</span>
            <div className={s.message}>
                <p>{message.message}</p>
            </div>
        </div>
    )
})