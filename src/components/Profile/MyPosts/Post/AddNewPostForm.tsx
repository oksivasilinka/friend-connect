import { InjectedFormProps, reduxForm } from 'redux-form'
import { createField } from 'components/login/Login'
import { maxLengthCreator, requiredField } from 'utils/validators/validators'
import { Textarea } from 'components/common/formsControls/FormControls'
import React from 'react'
import { AddPostFormData } from 'components/profile/myPosts/MyPosts'

type AddPostFormProperties = Extract<keyof AddPostFormData, string>

const maxLength100 = maxLengthCreator(100)

export const AddNewPostForm = (props: InjectedFormProps<AddPostFormData>) => {
    return (
        <form onSubmit={props.handleSubmit}>
            {createField<AddPostFormProperties>('Type text', 'newPostText', [requiredField, maxLength100], Textarea)}
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

export const AddNewPostFormRedux = reduxForm<AddPostFormData>({ form: 'addPostForm' })(AddNewPostForm)

