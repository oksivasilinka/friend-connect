import { AppThunk, InferActionsType } from './store'
import { Articles, FilterNewsForm, newsAPI } from 'api/newsApi'

let initialState = {
    news: [] as Articles[],
    filter: {
        search: '',
        country: 'us',
        category: ''
    }
}

export const newsReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'SET_NEWS_DATA' :
            return { ...state, news: action.data.filter(i => i.title !== '[Removed]') }

        default:
            return state || initialState
    }
}


export const newsActions = {
    getNewsData: (data: Articles[]) => ({ type: 'SET_NEWS_DATA', data }) as const
}

export const getNews = (filter: FilterNewsForm): AppThunk => (dispatch) => {
    newsAPI.getNews(filter.country, filter.category, filter.search)
        .then(res => {
            dispatch(newsActions.getNewsData(res.data.articles))
        })
        .catch((error) => {
            console.error(error)
        })
}

type InitialStateType = typeof initialState
export type ActionTypes = InferActionsType<typeof newsActions>

