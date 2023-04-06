import React from "react";
import s from './MyPosts.module.css';
import Post, {PostType} from "./MyPost/Post";


function MyPosts(props: PostType) {
    return (
        <div>
            My posts
            <div>
                New post
            </div>
            <div className={s.posts}>
                <Post message="it's my first post" like={10}/>
                <Post message="it's my second post" like={20}/>
                <Post message="hello, friends" like={30}/>
            </div>
        </div>
    )
}


export default MyPosts;