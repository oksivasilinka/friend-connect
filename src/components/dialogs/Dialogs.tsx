import React from 'react'
import s from './Dialogs.module.css'
import { DialogItem } from './dialogItem/DialogItem'
import { Message } from './message/Message'
import { DialogsPageType } from './DialogsContainer'
import { AddMessageFormRedux } from 'components/dialogs/AddNewMessageForm'

type DialogsProps = {
    addNewMessage: (text: string) => void
    dialogsPage: DialogsPageType
}
export type AddMessageFormData = { newMessageBody: string }


export const Dialogs = React.memo<DialogsProps>(({ dialogsPage, addNewMessage }) => {

    const dialogsElements = dialogsPage.dialogs.map((d) => <DialogItem key={d.id} name={d.name} id={d.id} />)
    const messagesElements = dialogsPage.messages.map((m) => <Message key={m.id} message={m.message} id={m.id} />)

    const addNewMessageHandler = (value: AddMessageFormData) => {
        addNewMessage(value.newMessageBody)
        value.newMessageBody = ''
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}> {dialogsElements} </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <AddMessageFormRedux onSubmit={addNewMessageHandler} />
            </div>
        </div>
    )
})
