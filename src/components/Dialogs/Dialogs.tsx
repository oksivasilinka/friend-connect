import React from "react";
import s from './Dialogs.module.css';
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {DialogsPageType} from "../../redux/state";

export const Dialogs = (props: DialogsPageType) => {

    const dialogsElements = props.dialogs.map((d) => <DialogItem key={d.id} name={d.name} id={d.id}/>)
    const messagesElements = props.messages.map((m) => <Message key={m.id} message={m.message} id={m.id}/>)

    const newMessage = React.createRef<HTMLTextAreaElement>()

    const addMessage = () => {
        const text = newMessage.current?.value
        alert(text)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>

            <div className={s.messages}>
                {messagesElements}
                <div>
                    <textarea ref={newMessage}></textarea>
                    <button onClick={addMessage}>Add message</button>
                </div>
            </div>

        </div>
    )
}