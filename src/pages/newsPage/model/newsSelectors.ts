import { AppRootStateType } from 'redux/store'

export const filterSelector = (state: AppRootStateType) => state.news.filter

export const newsListSelector = (state: AppRootStateType) => state.news.news

export const currentPageNewsSelector = (state: AppRootStateType) => state.news.currentPage

export const totalCountNewsSelector = (state: AppRootStateType) => state.news.totalCount

export const isLoadingSelector = (state: AppRootStateType) => state.news.isLoading
