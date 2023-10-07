import s from './ProfileInfo.module.css'
import React from 'react'
import { ProfileResponseType } from 'api/profileApi'
import { Contact } from 'components/profile/profileInfo/Contact'


type Props = {
    profile: ProfileResponseType
    isOwner: boolean
    goToEditMode: () => void
}

export const ProfileData = ({ profile, isOwner, goToEditMode }: Props) => {
    return (

        <div className={s.infoBlock}>
            {isOwner && <div>
                <button onClick={goToEditMode}>Edit Profile</button>
            </div>}
            <h4>Full name: </h4> {profile.fullName}
            <h4>Обо мне: </h4> {profile.aboutMe}
            <h4>Поиск работы: </h4> {profile.lookingForAJob ? 'Ищу работу' : 'Не ищу работу'}
            <h4>Описание: </h4> {profile.lookingForAJobDescription}
            <div>
                <h4> Контакты: </h4>
                {profile.contacts && Object.entries(profile.contacts).map(([key, value]) => {
                    return <Contact key={key} contactTitle={key} contactValue={value} />
                })}
            </div>
        </div>
    )
}

