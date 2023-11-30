import s from './ProfileData.module.css'
import React from 'react'
import { ProfileResponseType } from 'api/profileApi'
import { Contact } from 'components/profile/profileInfo/profileData/contact/Contact'


type Props = {
    profile: ProfileResponseType
}

export const ProfileData = ({ profile }: Props) => {
    return (
        <div className={s.wrapper}>

            <div className={s.item}>
                <span className={s.subtitle}>Full name:{' '} </span>
                <span className={s.text}>{profile.fullName}</span>
            </div>
            <div className={s.item}>
                <span className={s.subtitle}>Обо мне:{' '} </span>
                <span className={s.text}>{profile.aboutMe}</span>
            </div>
            <div className={s.item}>
                <span className={s.subtitle}>Поиск работы:{' '} </span>
                <span className={s.text}>{profile.lookingForAJob ? 'Ищу работу' : 'Не ищу работу'}</span>
            </div>
            <div className={s.item}>
                <span className={s.subtitle}>Описание:{' '} </span>
                <span className={s.text}>{profile.lookingForAJobDescription}</span>
            </div>


            <div>
                <span className={s.subtitle}> Контакты: </span>
                {profile.contacts && Object.entries(profile.contacts).map(([key, value]) => {
                    return <Contact key={key} contactTitle={key} contactValue={value} />
                })}
            </div>
        </div>
    )
}

