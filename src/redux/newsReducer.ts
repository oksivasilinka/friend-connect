import { AppThunk, InferActionsType } from './store'
import { Articles, FilterNewsForm, newsAPI } from 'api/newsApi'

let initialState = {
    news: [] as Articles[],
    filter: {
        search: '',
        country: 'us',
        category: ''
    },
    totalCount: 0,
    currentPage: 1
}

export const newsReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'SET_NEWS_DATA' :
            return { ...state, news: action.data.filter(i => i.title !== '[Removed]') }
        case 'SET_CURRENT_PAGE':
            return { ...state, currentPage: action.currentPage }
        case 'SET_TOTAL_COUNT':
            return { ...state, totalCount: action.count }
        case 'SET_FILTER':
        default:
            return state || initialState
    }
}


export const newsActions = {
    getNewsData: (data: Articles[]) => ({ type: 'SET_NEWS_DATA', data }) as const,
    setCurrentPage: (currentPage: number) => ({ type: 'SET_CURRENT_PAGE', currentPage }) as const,
    setTotalCount: (totalCount: number) => ({ type: 'SET_TOTAL_COUNT', count: totalCount }) as const,
    setFilter: (filter: FilterNewsForm) => ({ type: 'SET_FILTER', payload: filter }) as const
}

export const getNews = (page: number, pageSize: number, filter: FilterNewsForm): AppThunk => async (dispatch) => {
    dispatch(newsActions.setFilter(filter))
    dispatch(newsActions.setCurrentPage(page))
    const res = await newsAPI.getNews(page, pageSize, filter.country, filter.category, filter.search)
    dispatch(newsActions.getNewsData(res.data.articles))
    dispatch(newsActions.setTotalCount(res.data.totalResults))
}

type InitialStateType = typeof initialState
export type ActionTypes = InferActionsType<typeof newsActions>

