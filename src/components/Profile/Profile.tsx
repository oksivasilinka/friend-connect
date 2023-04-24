import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {PostsType} from "../../index";
import MyPosts from "./MyPosts/MyPosts";


function Profile(props: PostsType) {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts posts={props.posts}/>

        </div>)
}

export default Profile;