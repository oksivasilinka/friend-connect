import React from "react";
import {ProfileInfo} from "./MyPosts/ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPosts.container";
import {ProfileType} from "../../redux/profileReducer";

type PropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
}

export const Profile = (props: PropsType) => {
    return (
        <div>
            <ProfileInfo profile={props.profile} status={props.status} updateStatus={props.updateStatus}/>
            <MyPostsContainer/>
        </div>
    )
}