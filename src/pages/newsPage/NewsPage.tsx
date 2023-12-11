import { useEffect } from 'react'
import { getNews } from 'redux/newsReducer'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'redux/store'
import { Preloader, Typography } from 'components/common'
import { useLocation, useNavigate } from 'react-router-dom'
import { getIsFetching } from 'pages/usersPage'
import { filterSelector, newsListSelector } from 'pages/newsPage/model'
import { News, NewsSearchForm } from 'pages/newsPage/news'

export const NewsPage = () => {
    const newsList = useSelector(newsListSelector)
    const filter = useSelector(filterSelector)
    const isFetching = useSelector(getIsFetching)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search)

        const country = searchParams.get('country')
        const category = searchParams.get('category')
        let actualFilter = filter
        if (country) {
            actualFilter = { ...actualFilter, country: filter.country }
        }
        if (category) {
            actualFilter = { ...actualFilter, category: filter.category }
        }
        dispatch(getNews(actualFilter))
    }, [])

    useEffect(() => {
        navigate({
            pathname: '/news',
            search: `?country=${filter.country}&category=${filter.category}`
        })
    }, [filter.country, filter.category])

    return (
        <section>
            <Typography variant={'h2'} as={'h2'}>News</Typography>
            {isFetching && <Preloader />}
            <NewsSearchForm />
            {newsList.map((news) => <News news={news} />)}
        </section>
    )
}