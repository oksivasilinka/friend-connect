import React, { useEffect } from 'react'
import { getNews } from 'redux/newsReducer'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'redux/store'
import { Preloader, Typography } from 'components/common'
import { useLocation, useNavigate } from 'react-router-dom'
import { getIsFetching } from 'pages/usersPage'
import { currentPageNewsSelector, filterSelector, newsListSelector, totalCountNewsSelector } from 'pages/newsPage/model'
import { News, NewsSearchForm } from 'pages/newsPage/news'
import { Pagination } from 'antd'

export const NewsPage = () => {
    const newsList = useSelector(newsListSelector)
    const filter = useSelector(filterSelector)
    const isFetching = useSelector(getIsFetching)
    const totalCount = useSelector(totalCountNewsSelector)
    const currentPage = useSelector(currentPageNewsSelector)

    const pageSize = 10

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const onPageChanged = (page: number, pageSize: number) => {

        dispatch(getNews(page, pageSize, filter))
    }

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search)

        const country = searchParams.get('country')
        const category = searchParams.get('category')
        const search = searchParams.get('q')
        let actualFilter = filter
        if (country) {
            actualFilter = { ...actualFilter, country: filter.country }
        }
        if (category) {
            actualFilter = { ...actualFilter, category: filter.category }
        }
        if (search) {
            actualFilter = { ...actualFilter, search: filter.search }
        }
        dispatch(getNews(currentPage, pageSize, actualFilter))
    }, [])

    useEffect(() => {
        navigate({
            pathname: '/news',
            search: `?country=${filter.country}&q=${filter.search}&category=${filter.category}`
        })
    }, [filter.country, filter.category, filter.search])


    return (
        <section>
            <Typography variant={'h2'} as={'h2'}>News</Typography>
            {isFetching && <Preloader />}
            <NewsSearchForm pageSize={pageSize} currentPage={currentPage} />
            <Pagination defaultCurrent={1} total={totalCount}
                        style={{ display: 'flex', justifyContent: 'center', padding: '20px 0' }}
                        onChange={(page, pageSize) => onPageChanged(page, pageSize)}
                        current={currentPage}
            />

            {newsList.map((news) => <News news={news} />)}
        </section>
    )
}