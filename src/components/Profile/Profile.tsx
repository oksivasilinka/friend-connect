import React from "react";
import s from './Profile.module.css';
import MyPosts, {PostType} from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";


function Profile(props: PostType) {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts message={props.message} likesCount={props.likesCount}/>

        </div>)
}

export default Profile;