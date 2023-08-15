import React, {ChangeEvent} from "react";
import s from './Dialogs.module.css';
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {DialogsPageType} from "./DialogsContainer";

type DialogsPropsType = {
    updateNewMessageBody: (body: string) => void
    addNewMessage: (text: string) => void
    dialogsPage: DialogsPageType
}

export const Dialogs = (props: DialogsPropsType) => {
    let state = props.dialogsPage

    const dialogsElements = state.dialogs.map((d) => <DialogItem key={d.id} name={d.name} id={d.id}/>)
    const messagesElements = state.messages.map((m) => <Message key={m.id} message={m.message} id={m.id}/>)
    const newMessageBody = state.newMessageText
    const newMessage = React.createRef<HTMLTextAreaElement>()

    const addMessage = () => {
        props.addNewMessage(newMessageBody)
    }
    const onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.updateNewMessageBody(e.currentTarget.value)
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