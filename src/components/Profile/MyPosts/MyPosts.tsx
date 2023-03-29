import React from "react";
import classes from './MyPosts.module.css';
import Post from "./MyPost/Post";

function MyPosts() {
    return <div>
        My posts
        <div>
            New post
        </div>
        <div className={classes.posts}>
            <Post message="it's my first post" like={10}/>
            <Post message="it's my second post" like={20}/>
            <Post message="hello, friends" like={30}/>
        </div>
    </div>
}

export default MyPosts;