import React, {ChangeEvent} from "react";
import s from './Dialogs.module.css';
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {
    ActionTypes,
    DialogsType,
    MessagesType
} from "../../redux/state";
import {addNewMessageAC, ChangeNewMessageAC} from "../../redux/dialogsReducer";

type DialogsPropsType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
    dispatch: (action: ActionTypes) => void
    newMessageText: string
}

export const Dialogs = (props: DialogsPropsType) => {

    const dialogsElements = props.dialogs.map((d) => <DialogItem key={d.id} name={d.name} id={d.id}/>)
    const messagesElements = props.messages.map((m) => <Message key={m.id} message={m.message} id={m.id}/>)

    const newMessage = React.createRef<HTMLTextAreaElement>()

    const addMessage = () => {
        props.dispatch(addNewMessageAC(props.newMessageText))
    }
    const onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.dispatch(ChangeNewMessageAC(e.currentTarget.value))
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
                        <textarea value={props.newMessageText} onChange={onNewMessageChange}
                                  placeholder={'Enter your message'} ref={newMessage}></textarea>
                    </div>
                    <button onClick={addMessage}>Add message</button>
                </div>
            </div>

        </div>
    )
}