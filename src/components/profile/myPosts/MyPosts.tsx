import React from 'react'
import s from './MyPosts.module.css'
import { Post, AddNewPostFormRedux } from './post'
import { PostsType } from 'redux/profileReducer'

type MyPostsProps = {
    addPost: (text: string) => void
    posts: PostsType[]
}

export type AddPostFormData = { newPostText: string }

export const MyPosts = React.memo<MyPostsProps>(({ addPost, posts }) => {

    const postsElements = posts.map((p) => <Post key={p.id} message={p.message} likeCount={p.likeCount} />)

    const onAddPost = (value: AddPostFormData) => {
        addPost(value.newPostText)
        value.newPostText = ''
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <AddNewPostFormRedux onSubmit={onAddPost} />
            </div>
            <div className={s.posts}> {postsElements} </div>
        </div>
    )
})
