import { ReactNode } from 'react'
import s from './Button.module.css'

type Props = {
    children: ReactNode
    callback?: any
    className?: string
    title?: string
}

export const Button = ({ children, callback, className, title }: Props) => {
    return (
        <button title={title} className={`${s.button} ${className}`} onClick={callback}>
            {children}
        </button>
    )
}