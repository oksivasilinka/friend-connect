import { InjectedFormProps, reduxForm } from 'redux-form'
import { maxLengthCreator, requiredField } from 'utils/validators/validators'
import { Textarea } from 'components/common/formsControls/FormControls'
import React, { FC } from 'react'
import { AddPostFormData } from 'components/profile/myPosts/MyPosts'
import { createField } from 'utils/createField/createField'

type AddPostFormProperties = Extract<keyof AddPostFormData, string>

const maxLength100 = maxLengthCreator(100)

export const AddNewPostForm: FC<InjectedFormProps<AddPostFormData>> = ({ handleSubmit }) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField<AddPostFormProperties>('Type text', 'newPostText', [requiredField, maxLength100], Textarea)}
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

export const AddNewPostFormRedux = reduxForm<AddPostFormData>({ form: 'addPostForm' })(AddNewPostForm)

