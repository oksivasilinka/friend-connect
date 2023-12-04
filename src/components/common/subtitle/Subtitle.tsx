import s from './Subtitle.module.css'

type Props = {
    title: string
}

export const Subtitle = ({ title }: Props) => {
    return <h3 className={s.title}>{title}</h3>
}