import {ActionTypes, ProfilePageType} from "./state";

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST = 'UPDATE-NEW-POST-TEXT';

export type AddPostActionType = ReturnType<typeof addPostAC>
export type UpdateNewPostTextActionType = ReturnType<typeof ChangeNewTextAC>

export const profileReducer = (state: ProfilePageType, action: ActionTypes): ProfilePageType => {
    switch (action.type) {
        case ADD_POST:
            const newPost = {
                id: new Date().getTime(),
                message: state.newPostText,
                likeCount: 0
            }
            state.posts.push(newPost)
            state.newPostText = ''
            return state
        case UPDATE_NEW_POST:
            state.newPostText = action.postText
            return state
        default:
            return state
    }
}

export const addPostAC = (postText: string) => ({
    type: ADD_POST,
    newPostText: postText
}) as const

export const ChangeNewTextAC = (postText: string) => ({
    type: UPDATE_NEW_POST,
    postText: postText
}) as const