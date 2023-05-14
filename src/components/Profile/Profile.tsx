import React from "react";
import {MyPosts} from "./MyPosts/MyPosts";
import {ProfileInfo} from "./MyPosts/ProfileInfo/ProfileInfo";
import {PostsType, updateNewPostText} from "../../redux/state";

export type ProfilePropsType = {
    posts: Array<PostsType>
    addPostCallback: () => void
    updateNewPostText: (newPostText: string) => void
    newPostText: string
}

export const Profile = (props: ProfilePropsType) => {


    return (
        <div>
            <ProfileInfo/>
            <MyPosts
                posts={props.posts}
                addPostCallback={props.addPostCallback}
                newPostText={props.newPostText}
                updateNewPostText={updateNewPostText}/>
        </div>
    )

}