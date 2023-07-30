
const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST = 'UPDATE-NEW-POST-TEXT';


export type PostsType = {
    id?: number
    message: string
    likeCount: number
}


export type AddPostActionType = ReturnType<typeof addPostAC>
export type UpdateNewPostTextActionType = ReturnType<typeof ChangeNewTextAC>

export type InitialStateType = typeof initialState

export type ActionTypes = AddPostActionType | UpdateNewPostTextActionType

export let initialState = {
        posts: [
            {id: 1, message: 'Hello', likeCount: 20},
            {id: 2, message: 'Hi', likeCount: 10},
            {id: 3, message: 'How are You', likeCount: 15},
        ] as Array<PostsType>,
        newPostText: ''
    }

export const profileReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case ADD_POST:
            const newPost = {
                id: new Date().getTime(),
                message: state.newPostText,
                likeCount: 0
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            };
        case UPDATE_NEW_POST:
            return {
                ...state,
                newPostText: action.postText
            };
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