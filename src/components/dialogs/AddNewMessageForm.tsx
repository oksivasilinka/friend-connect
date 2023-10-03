import { InjectedFormProps, reduxForm } from 'redux-form'
import { maxLengthCreator, requiredField } from 'utils/validators/validators'
import { Textarea } from 'components/common/formsControls/FormControls'
import React, { FC } from 'react'
import { AddMessageFormData } from 'components/dialogs/DialogsPage'
import { createField } from 'utils/createField/createField'

type AddMessageFormProperties = Extract<keyof AddMessageFormData, string>

const maxLength50 = maxLengthCreator(50)

export const AddMessageForm: FC<InjectedFormProps<AddMessageFormData>> = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                {createField<AddMessageFormProperties>('Enter your message', 'newMessageBody', [requiredField, maxLength50], Textarea)}
            </div>
            <button>Add message</button>
        </form>
    )
}

export const AddMessageFormRedux = reduxForm<AddMessageFormData>({ form: 'dialogAddMessageForm' })(AddMessageForm)
