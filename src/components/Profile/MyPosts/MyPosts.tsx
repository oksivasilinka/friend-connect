import React, {ChangeEvent} from "react";
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";
import {PostsType} from "../../../redux/store";

type MyPostsPropsType = {
    addPost: () => void
    updateNewPostText: (text: string) => void
    posts: Array<PostsType>
    newPostText: string
}

export const MyPosts = (props: MyPostsPropsType) => {

    const postsElements = props.posts.map((p) =>
        <Post key={p.id} message={p.message} likeCount={p.likeCount}/>)

    const onAddPost = () => {
        props.addPost()
    }

    const onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let text = e.currentTarget.value
        props.updateNewPostText(text)
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
                    <button onClick={onAddPost}>add post</button>
                    <button>remove</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}
