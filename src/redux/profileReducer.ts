import {ActionTypes, ProfilePageType} from "./store";

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST = 'UPDATE-NEW-POST-TEXT';


export type AddPostActionType = ReturnType<typeof addPostAC>
export type UpdateNewPostTextActionType = ReturnType<typeof ChangeNewTextAC>

export let initialState: ProfilePageType = {
        posts: [
            {id: 1, message: 'Hello', likeCount: 20},
            {id: 2, message: 'Hi', likeCount: 10},
            {id: 3, message: 'How are You', likeCount: 15},
        ],
        newPostText: ''
    }

export const profileReducer = (state: ProfilePageType = initialState, action: ActionTypes): ProfilePageType => {
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
            return state || initialState
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