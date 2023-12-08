import { AppThunk, InferActionsType } from './store'
import { Articles, newsAPI } from 'api/newsApi'

let initialState = {
    news: [] as Articles[]
}

export const newsReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'SET_NEWS_DATA' :
            return { ...state, news: action.data }

        default:
            return state || initialState
    }
}


export const newsActions = {
    getNewsData: (data: Articles[]) => ({ type: 'SET_NEWS_DATA', data }) as const
}

export const getNews = (): AppThunk => (dispatch) => {
    newsAPI.getNews()
        .then(res => {
            dispatch(newsActions.getNewsData(res.data.articles))
        })
        .catch((error) => {
            console.error(error)
        })
}

type InitialStateType = typeof initialState
export type ActionTypes = InferActionsType<typeof newsActions>

