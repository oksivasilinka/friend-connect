import { Message } from 'components/ChatPage/Chat/Messages/Message/Message'
import s from './Messages.module.css'
import { useSelector } from 'react-redux'
import { AppRootStateType } from 'redux/store'

export const Messages = () => {

    const messages = useSelector((state: AppRootStateType) => state.chat.messages)

    return (
        <div className={s.messagesBlock}>
            {messages?.map((message: any, index) => <Message key={index} message={message} />)}
        </div>
    )
}