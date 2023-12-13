import { AppRootStateType } from 'redux/store'

export const filterSelector = (state: AppRootStateType) => {
    return state.news.filter
}

export const newsListSelector = (state: AppRootStateType) => {
    return state.news.news
}

export const currentPageNewsSelector = (state: AppRootStateType) => {
    return state.news.currentPage
}

export const totalCountNewsSelector = (state: AppRootStateType) => {
    return state.news.totalCount
}