import React from 'react'
import s from 'components/profile/profileInfo/profileData/contact/Contact.module.css'

type Props = {
    contactTitle: string
    contactValue: string | null
}


export const Contact = ({ contactTitle, contactValue }: Props) => {
    return (
        <div className={s.contact}>
            <span className={s.subtitle}>{`${contactTitle}: `}</span>
            <a href={'#'}>{contactValue}</a>
        </div>
    )

}
