import React from 'react'
import s from './MyPosts.module.css'
import { AddNewPostFormRedux, Post } from './post'
import { profileActions } from 'redux/profileReducer'
import { useDispatch, useSelector } from 'react-redux'
import { myPostsSelectors } from 'components/profile/myPosts/myPostsSelectors'

export type AddPostFormData = { newPostText: string }

export const MyPosts = React.memo(() => {

    const posts = useSelector(myPostsSelectors)
    const dispatch = useDispatch()

    const postsElements = posts.map((p) => <Post key={p.id} message={p.message} likeCount={p.likeCount} />)

    const onAddPost = (value: AddPostFormData) => {
        dispatch(profileActions.addPostAC(value.newPostText))
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
