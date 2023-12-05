import s from './Subtitle.module.css'

type Props = {
    title: string
}

export const Subtitle = ({ title }: Props) => {
    return <h3 className={s.subtitle}>{title}</h3>
}