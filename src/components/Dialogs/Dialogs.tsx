import React from "react";
import s from "./Dialogs.module.css";
import {DialogItem} from "./DialogItem/DialogItem";
import {MessagesType} from "../../index";
import {Message} from "./Message/Message";


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
