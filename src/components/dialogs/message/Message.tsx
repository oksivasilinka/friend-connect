import React from 'react'
import s from './../Dialogs.module.css'

type Props = {
    message: string
}

export const Message = ({ message }: Props) => {
    return <div className={s.dialog}>
        {message}
    </div>
}
