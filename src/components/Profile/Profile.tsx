import React from "react";
import s from './Profile.module.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPosts from "./MyPosts/MyPosts";

export type PostType = {
    id?: number
    message: string
    likesCount: number
}
export let posts = [
    {id: 1, message: "it's my first post", likesCount: 10},
    {id: 2, message: "it\'s my second post", likesCount: 20},
    {id: 3, message: "hello, friends", likesCount: 30},
    {id: 4, message: "wow", likesCount: 40}
]

function Profile(props: PostType) {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts message={props.message} likesCount={props.likesCount}/>

        </div>)
}

export default Profile;