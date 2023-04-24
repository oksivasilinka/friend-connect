import React from "react";
import s from './MyPosts.module.css';
import Post from "./MyPost/Post";
import {PostsType} from "../../../index";


function MyPosts(props: PostsType) {

    let postsElements = props.posts.map((p) => <Post message={p.message} likesCount={p.likesCount}/>)


    return (
        <div className={s.postsBlock}>
           <h3> My posts</h3>
            <div>
                <div>
                    <textarea></textarea>
                </div>
                <div>
                    <button>Add Post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}

export default MyPosts;