import React from "react";
import {ProfileInfo} from "./MyPosts/ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPosts.container";
import {ProfileType} from "../../redux/profileReducer";
import {Redirect} from "react-router-dom";

type PropsType = {
    profile: ProfileType | null
    isAuth: boolean
}

export const Profile = (props: PropsType) => {
    if (!props.isAuth)
        return <Redirect to={'/login'}/>

    return (
        <div>
            <ProfileInfo profile={props.profile}/>
            <MyPostsContainer/>
        </div>
    )

}