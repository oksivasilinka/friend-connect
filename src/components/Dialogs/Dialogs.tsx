import React from "react";
import s from "./Dialogs.module.css"
import {NavLink} from "react-router-dom";

type DialogItemType = {
    name: string
    id: string
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
}

const Message = (props: MessageType) => {
    return (
        <div className={s.dialog}>{props.message}</div>
    )
}

export const Dialogs = (props: MessageType) => {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItem}>
                <DialogItem name={'Oksana'} id={'1'}/>
                <DialogItem name={'Volodya'} id={'2'}/>
                <DialogItem name={'Valera'} id={'3'}/>
            </div>
            <div className={s.messages}>
                <Message message={'Hi'}/>
                <Message message={'Hello!'}/>
                <Message message={'How are you?'}/>
                <Message message={'Nice!'}/>
            </div>
        </div>
    )
}
