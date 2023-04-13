import React from "react";
import s from './MyPosts.module.css';
import Post from "./MyPost/Post";
import {posts, PostType} from "../Profile";



function MyPosts(props: PostType) {

    // let posts = [
    //     {id: 1, message: "it's my first post", likesCount: 10},
    //     {id: 2, message: "it\'s my second post", likesCount: 20},
    //     {id: 3, message: "hello, friends", likesCount: 30},
    //     {id: 4, message: "wow", likesCount: 40}
    // ]

    let postsElements = posts.map((p) => <Post message={p.message} likesCount={p.likesCount}/>)

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