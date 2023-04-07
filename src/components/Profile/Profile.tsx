import React from "react";
import s from './Profile.module.css';
import MyPosts from "./MyPosts/MyPosts";
import {PostType} from "./MyPosts/MyPost/Post";
import ProfileInfo from "./ProfileInfo/ProfileInfo";


function Profile(props: PostType) {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts message={props.message} like={props.like}/>

        </div>)
}

export default Profile;