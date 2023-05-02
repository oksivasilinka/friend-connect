import React from "react";
import {MyPosts} from "./MyPosts/MyPosts";
import {ProfileInfo} from "./MyPosts/ProfileInfo/ProfileInfo";
import {PostsType} from "../../redux/state";

export type MessageType = {
    posts: PostsType[]
    addPostCallback: (postMessage: string) => void
}

export const Profile = (props: MessageType) => {


    return (
        <div>
            <ProfileInfo/>
            <MyPosts posts={props.posts} addPostCallback={props.addPostCallback}/>
        </div>
    )

}