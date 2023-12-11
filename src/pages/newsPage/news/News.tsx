import { Typography } from 'components/common'
import { Articles } from 'api/newsApi'
import s from './News.module.css'

type Props = {
    news: Articles
}

export const News = ({ news }: Props) => {
    const date = new Date(news.publishedAt).toLocaleString('ru-RU', {
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        month: 'numeric',
        year: 'numeric',
    })
    return (
        <div className={s.newsWrapper} key={news.url}>
            <Typography className={s.title} variant={'h4'} as={'h4'}>{news.title}</Typography>
            <Typography className={s.title} variant={'subtitle3'}> {news.description}</Typography>
            <Typography className={s.title} variant={'body2'}> {news.content}</Typography>
            <Typography className={s.date} variant={'subtitle3'}>published: {date}</Typography>
            <Typography as={'a'} variant={'caption1'} href={news.url}>link to source</Typography>
            <img className={s.image} src={news.urlToImage} alt={news.urlToImage} />
        </div>
    )
}