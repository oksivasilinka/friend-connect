import React from "react";
import s from './Profile.module.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPosts, {PostsType} from "./MyPosts/MyPosts";


function Profile(props: PostsType) {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts posts={props.posts}/>

        </div>)
}

export default Profile;