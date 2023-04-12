import React from "react";
import s from './MyPosts.module.css';
import Post from "./MyPost/Post";

export type PostType = {
    id?: number
    message: string
    likesCount: number
}

function MyPosts(props: PostType) {


    let postsData = [
        {id: 1, message: "it's my first post", likesCount: 10},
        {id: 2, message: "it\'s my second post", likesCount: 20},
        {id: 3, message: "hello, friends", likesCount: 30}
    ]

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
                <Post message={postsData[0].message} likesCount={postsData[0].likesCount}/>
                <Post message={postsData[1].message} likesCount={postsData[1].likesCount}/>
                <Post message={postsData[2].message} likesCount={postsData[2].likesCount}/>
            </div>
        </div>
    )
}


export default MyPosts;