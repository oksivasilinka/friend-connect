import s from './Subtitle.module.css'

type Props = {
    title: string
    className?: string
}

export const Subtitle = ({ title, className }: Props) => {
    return <h3 className={`${s.subtitle} ${className}`}>{title}</h3>
}