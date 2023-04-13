import React from "react";
import s from "./Dialogs.module.css"
import {NavLink} from "react-router-dom";

type DialogItemType = {
    name: string
    id: number
}

const DialogItem = (props: DialogItemType) => {
    return (
        <div className={s.dialog + ' ' + s.active}>
            <NavLink to={'/dialogs/' + props.id}>{props.name}</NavLink>
        </div>
    )
}
type MessageType = {
    message: string
    id: number
}

const Message = (props: MessageType) => {
    return (
        <div className={s.dialog}>{props.message}</div>
    )
}

export const Dialogs = (props: MessageType) => {

    let dialogs = [
        {id: 1, name: 'Oksana'},
        {id: 2, name: 'Volodya'},
        {id: 3, name: 'Valera'},
        {id: 4, name: 'Masha'},
        {id: 5, name: 'Kate'},
        {id: 6, name: 'Alesya'},
    ]

    let messagesData = [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'Hello!'},
        {id: 3, message: 'How are you?'},
        {id: 4, message: 'Nice!'}
    ]
    let dialogsElements = dialogs.map((d) => <DialogItem name={d.name} id={d.id}/>)
    let messagesElements = messagesData.map((m) => <Message message={m.message} id={m.id}/>)

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
