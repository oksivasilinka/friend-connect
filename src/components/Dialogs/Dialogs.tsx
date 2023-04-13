import React from "react";
import s from "./Dialogs.module.css";
import {Message, MessagesType} from "./Message/Message";
import {DialogItem} from "./DialogItem/DialogItem";


export const Dialogs = (props: MessagesType) => {

    let dialogsElements = props.dialogs.map((d) => <DialogItem name={d.name} id={d.id}/>)
    let messagesElements = props.messagesData.map((m) => <Message message={m.message} id={m.id}/>)

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItem}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}

            </div>
        </div>
    )
}
