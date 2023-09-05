import React from "react";
import s from './Dialogs.module.css';
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {DialogsPageType} from "./DialogsContainer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, requiredField} from "../../utils/validators/validators";
import {Textarea} from "../common/formsControls/FormControls";

type DialogsPropsType = {
    addNewMessage: (text: string) => void
    dialogsPage: DialogsPageType
}

type FormDataType = {
    newMessageBody: string
}

const maxLength50 = maxLengthCreator(50)

export const Dialogs: React.FC<DialogsPropsType> = ({dialogsPage, addNewMessage}) => {

    const dialogsElements = dialogsPage.dialogs.map((d) => <DialogItem key={d.id} name={d.name} id={d.id}/>)
    const messagesElements = dialogsPage.messages.map((m) => <Message key={m.id} message={m.message} id={m.id}/>)

    const addNewMessageHandler = (value: FormDataType) => {
        addNewMessage(value.newMessageBody)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}> {dialogsElements} </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <AddMessageFormRedux onSubmit={addNewMessageHandler}/>
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