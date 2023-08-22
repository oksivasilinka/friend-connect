import React from "react";
import s from './Dialogs.module.css';
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {DialogsPageType} from "./DialogsContainer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, requiredField} from "../../utils/validators/validators";
import {Textarea} from "../common/formsControls/FormControls";

type DialogsPropsType = {
    updateNewMessageBody: (body: string) => void
    addNewMessage: (text: string) => void
    dialogsPage: DialogsPageType
}

type FormDataType = {
    newMessageBody: string
}

const maxLength50 = maxLengthCreator(50)

export const Dialogs = (props: DialogsPropsType) => {
    let state = props.dialogsPage

    const dialogsElements = state.dialogs.map((d) => <DialogItem key={d.id} name={d.name} id={d.id}/>)
    const messagesElements = state.messages.map((m) => <Message key={m.id} message={m.message} id={m.id}/>)

    const addNewMessage = (value: FormDataType) => props.addNewMessage(value.newMessageBody)


    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <AddMessageFormRedux onSubmit={addNewMessage}/>
            </div>
        </div>
    )
}

export const AddMessageForm = (props: InjectedFormProps<FormDataType>) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea}
                       name={'newMessageBody'}
                       placeholder={'Enter your message'}
                       validate={[requiredField, maxLength50]}>

                </Field>
            </div>
            <button>Add message</button>
        </form>
    )
}

const AddMessageFormRedux = reduxForm<FormDataType>({form: 'dialogAddMessageForm'})(AddMessageForm)