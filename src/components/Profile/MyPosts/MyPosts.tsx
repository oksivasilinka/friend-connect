import React, {ChangeEvent} from "react";
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";
import {PostsType} from "../../../redux/state";

type MyPostsPropsType = {
    posts: Array<PostsType>
    addPostCallback: (postMessage: string) => void
    updateNewPostText: (newPostText: string) => void
    newPostText: string
}

export const MyPosts = (props: MyPostsPropsType) => {

    const postsElements = props.posts.map((p) =>
        <Post key={p.id} message={p.message} likeCount={p.likeCount}/>)


    const addPost = () => {
            props.addPostCallback(props.newPostText)


    }

    const onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.updateNewPostText(e.currentTarget.value)

    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea value={props.newPostText}
                              onChange={onPostChange}
                              />
                </div>
                <div>
                    <button onClick={addPost}>add post</button>
                    <button>remove</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}
