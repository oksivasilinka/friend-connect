import React, { FC } from 'react'
import s from './Dialogs.module.css'
import { DialogItem } from './dialogItem/DialogItem'
import { Message } from './message/Message'
import { AddMessageFormRedux } from 'components/dialogs/AddNewMessageForm'
import { useDispatch, useSelector } from 'react-redux'
import { dialogPageSelector } from 'components/dialogs/dialogsSelectors'
import { dialogsActions } from 'redux/dialogsReducer'


export type AddMessageFormData = { newMessageBody: string }


const DialogsPage: FC = React.memo(() => {

    const dialogsPage = useSelector(dialogPageSelector)
    const dispatch = useDispatch()

    const dialogsElements = dialogsPage.dialogs.map((d) => <DialogItem key={d.id} name={d.name} id={d.id} />)
    const messagesElements = dialogsPage.messages.map((m) => <Message key={m.id} message={m.message} />)

    const addNewMessageHandler = (value: AddMessageFormData) => {
        dispatch(dialogsActions.addNewMessage(value.newMessageBody))
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

export default DialogsPage
