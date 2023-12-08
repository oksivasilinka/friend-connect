import { useEffect } from 'react'
import { getNews } from 'redux/newsReducer'
import { useSelector } from 'react-redux'
import { AppRootStateType, useAppDispatch } from 'redux/store'
import { Typography } from 'components/common'
import { News } from 'pages/newsPage/news/News'

export const NewsPage = () => {
    const newsList = useSelector((state: AppRootStateType) => state.news.news)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getNews())
    }, [])

    return (
        <section>
            <Typography variant={'h2'} as={'h2'}>News</Typography>
            <div>
                {newsList.map((news) => <News news={news} />)}
            </div>
        </section>
    )
}