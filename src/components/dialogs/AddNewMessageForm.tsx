import { InjectedFormProps, reduxForm } from 'redux-form'
import { createField } from 'components/login/Login'
import { maxLengthCreator, requiredField } from 'utils/validators/validators'
import { Textarea } from 'components/common/formsControls/FormControls'
import React from 'react'
import { AddMessageFormData } from 'components/dialogs/Dialogs'

type AddMessageFormProperties = Extract<keyof AddMessageFormData, string>

const maxLength50 = maxLengthCreator(50)

export const AddMessageForm = (props: InjectedFormProps<AddMessageFormData>) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<AddMessageFormProperties>('Enter your message', 'newMessageBody', [requiredField, maxLength50], Textarea)}
            </div>
            <button>Add message</button>
        </form>
    )
}

export const AddMessageFormRedux = reduxForm<AddMessageFormData>({ form: 'dialogAddMessageForm' })(AddMessageForm)
