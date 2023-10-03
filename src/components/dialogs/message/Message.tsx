import React, { FC } from 'react'
import s from './../Dialogs.module.css';

type Props = {
    message: string
}

export const Message: FC<Props> = ({message}) => {
    return <div className={s.dialog}>
        {message}
    </div>
}
