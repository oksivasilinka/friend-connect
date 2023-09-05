import {addPostAC, deletePostAC, PostsType, profileReducer} from "./profileReducer";

let initialState = {
    posts: [
        {id: 1, message: 'Hello', likeCount: 20},
        {id: 2, message: 'Hi', likeCount: 10},
        {id: 3, message: 'How are You', likeCount: 15},
    ] as PostsType[],
    profile: null,
    status: ''
}


test('new post should be added', () => {

    let action = addPostAC('new post')
    let newState = profileReducer(initialState, action)

    expect(newState.posts.length).toBe(4)
    expect(newState.posts[3].message).toBe('new post')
    expect(newState.posts[3].likeCount).toBe(0)
})

test('post should be deleted', () => {

    let action = deletePostAC(2)
    let newState = profileReducer(initialState, action)

    expect(newState.posts.length).toBe(2)
    expect(newState.posts[1].message).toBe('How are You')
})

