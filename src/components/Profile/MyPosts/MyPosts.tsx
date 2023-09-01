import React from "react";
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, requiredField} from "../../../utils/validators/validators";
import {Textarea} from "../../common/formsControls/FormControls";
import {PostsType} from "../../../redux/profileReducer";

type MyPostsPropsType = {
    addPost: (text: string) => void
    posts: PostsType[]
}

type FormDataType = {
    newPostText: string
}

const maxLength10 = maxLengthCreator(10)


export const MyPosts = React.memo((props: MyPostsPropsType) => {

    const postsElements = props.posts.map((p) =>
        <Post key={p.id} message={p.message} likeCount={p.likeCount}/>)

    const onAddPost = (value: FormDataType) => {
        props.addPost(value.newPostText)
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <AddNewPostFormRedux onSubmit={onAddPost}/>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
})

const AddNewPostForm = (props: InjectedFormProps<FormDataType>) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component={Textarea}
                   name={'newPostText'}
                   placeholder={'Type text'}
                   validate={[requiredField, maxLength10]}>
            </Field>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

const AddNewPostFormRedux = reduxForm<FormDataType>({form: 'addPostForm'})(AddNewPostForm)