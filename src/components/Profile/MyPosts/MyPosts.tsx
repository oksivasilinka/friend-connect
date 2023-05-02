import React from "react";
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";
import {MessageType} from "../Profile";



export const MyPosts = (props: MessageType) => {

    const postsElements = props.posts.map((p) => <Post message={p.message} likeCount={p.likeCount}/>)

    const newPostElement  = React.createRef<HTMLTextAreaElement>()

    const addPost = () => {
        if (newPostElement.current) {
            props.addPostCallback(newPostElement.current?.value)
        }
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea ref={newPostElement}></textarea>
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
