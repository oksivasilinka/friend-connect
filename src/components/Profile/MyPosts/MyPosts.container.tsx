import React from "react";
import {addPostAC, ChangeNewTextAC} from "../../../redux/profileReducer";
import {MyPosts} from "./MyPosts";
import {store} from "../../../redux/redux-store";

export const MyPostsContainer = () => {
    let state = store.getState()
    const addPost = () => {
        store.dispatch(addPostAC(store.getState().profilePage.newPostText))
    }

    const onPostChange = (text: string) => {
        store.dispatch(ChangeNewTextAC(text))
    }


    return <MyPosts
        updateNewPostText={onPostChange}
        addPost={addPost}
        posts={state.profilePage.posts}
        newPostText={state.profilePage.newPostText}
    />

}
