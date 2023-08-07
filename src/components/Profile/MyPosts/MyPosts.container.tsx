import React from "react";
import {addPostAC, changeNewTextAC, PostsType} from "../../../redux/profileReducer";
import {MyPosts} from "./MyPosts";
import {AppRootStateType, store} from "../../../redux/store";
import {connect} from "react-redux";
import {Dispatch} from "redux";

export type ProfilePageType = {
    posts: Array<PostsType>,
    newPostText: string
}

type MapStateToPropsType = {
    profilePage: ProfilePageType
}

type MapDispatchToPropsType = {
    addPost: () => void,
    updateNewPostText: (text: string) => void,
}

let mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
    return {
        profilePage: state.profilePage,
    }
}
let mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        addPost:( ) => {
            dispatch(addPostAC(store.getState().profilePage.newPostText))
        },
        updateNewPostText: (text: string) => {
            dispatch(changeNewTextAC(text))
        }
    }
}

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps) (MyPosts)