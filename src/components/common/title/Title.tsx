import s from './Title.module.css'

type Props = {
    title: string
}

export const Title = ({ title }: Props) => {
    return <h2 className={s.title}>{title}</h2>
}