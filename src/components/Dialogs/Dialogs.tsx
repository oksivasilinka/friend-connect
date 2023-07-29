import React, {ChangeEvent} from "react";
import s from './Dialogs.module.css';
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {DialogsType, MessagesType} from "../../redux/store";

type DialogsPropsType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
    updateNewMessageBody: (body: string) => void
    addNewMessage: (text: string) => void
    dialogsPage: any
}

export const Dialogs = (props: DialogsPropsType) => {
    let state = props.dialogsPage

    const dialogsElements = props.dialogs.map((d) => <DialogItem key={d.id} name={d.name} id={d.id}/>)
    const messagesElements = props.messages.map((m) => <Message key={m.id} message={m.message} id={m.id}/>)
    const newMessageBody = state.newMessageText
    const newMessage = React.createRef<HTMLTextAreaElement>()

    const addMessage = () => {
        props.addNewMessage(newMessageBody)
    }
    const onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let body = e.currentTarget.value
        props.updateNewMessageBody(body)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>

            <div className={s.messages}>
                <div>{messagesElements}</div>

                <div>
                    <div>
                        <textarea value={newMessageBody} onChange={onNewMessageChange}
                                  placeholder={'Enter your message'} ref={newMessage}></textarea>
                    </div>
                    <button onClick={addMessage}>Add message</button>
                </div>
            </div>

        </div>
    )
}