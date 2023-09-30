import s from 'components/profile/profileInfo/ProfileInfo.module.css'
import React from 'react'
import { ProfileResponseType } from 'api/profileApi'

type ContactProps = {
    contactTitle: string
    contactValue: string | null
}

type ProfileDataProps = {
    profile: ProfileResponseType
    isOwner: boolean
    goToEditMode: () => void
}

export const ProfileData = ({ profile, isOwner, goToEditMode }: ProfileDataProps) => {
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


export const Contact: React.FC<ContactProps> = ({ contactTitle, contactValue }) => {
    return (
        <div>
            <b>{contactTitle}</b>: {contactValue}
        </div>
    )

}
