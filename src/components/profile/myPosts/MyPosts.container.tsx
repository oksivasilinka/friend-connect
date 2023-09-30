import { PostsType, profileActions } from 'redux/profileReducer'
import {MyPosts} from "./MyPosts";
import {AppRootStateType} from "redux/store";
import {connect} from "react-redux";
import {Dispatch} from "redux";


type MapStateToPropsType = {
    posts: PostsType[]
}

type MapDispatchToPropsType = {
    addPost: (newPostText: string) => void
}

let mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
    return {
        posts: state.profilePage.posts
    }
}
let mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        addPost:( newPostText: string) => {
            dispatch(profileActions.addPostAC(newPostText))
        }
    }
}

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps) (MyPosts)