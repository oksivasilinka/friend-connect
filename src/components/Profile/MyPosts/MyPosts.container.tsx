import React from "react";
import {addPostAC, ChangeNewTextAC} from "../../../redux/profileReducer";
import {StoreType} from "../../../redux/store";
import {MyPosts} from "./MyPosts";

type MyPostsPropsType = {
    store: StoreType
}

export const MyPostsContainer = (props: MyPostsPropsType) => {
    let state = props.store.getState()

    const addPost = () => {
        props.store.dispatch(addPostAC(state.profilePage.newPostText))
    }

    const onPostChange = (text: string) => {
        props.store.dispatch(ChangeNewTextAC(text))
    }

    return (
        <MyPosts
            updateNewPostText={onPostChange}
            addPost={addPost}
            posts={state.profilePage.posts}
            newPostText={state.profilePage.newPostText}/>
    )
}
