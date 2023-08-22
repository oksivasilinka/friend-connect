import React from "react";
import {addPostAC, PostsType} from "../../../redux/profileReducer";
import {MyPosts} from "./MyPosts";
import {AppRootStateType} from "../../../redux/store";
import {connect} from "react-redux";
import {Dispatch} from "redux";

export type ProfilePageType = {
    posts: Array<PostsType>,
}

type MapStateToPropsType = {
    profilePage: ProfilePageType
}

type MapDispatchToPropsType = {
    addPost: (newPostText: string) => void
}

let mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
    return {
        profilePage: state.profilePage,
    }
}
let mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        addPost:( newPostText: string) => {
            dispatch(addPostAC(newPostText))
        }
    }
}

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps) (MyPosts)