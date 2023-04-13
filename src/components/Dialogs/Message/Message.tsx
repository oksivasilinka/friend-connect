import React from "react";
import s from "./../Dialogs.module.css"
import {DialogsType} from "../DialogItem/DialogItem";

export type MessagesType = {
    messagesData: MessageType[];
    dialogs: DialogsType[];

}

export type MessageType = {
    message: string
    id: number
}

export const Message = (props: MessageType) => {
    return (
        <div className={s.dialog}>{props.message}</div>
    )
}
