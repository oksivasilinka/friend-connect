import React, { ChangeEvent, useState } from 'react'
import s from 'Components/Profile/ProfileInfo/ProfileInfo.module.css'
import { Preloader } from 'Components/common/preloader/preloader'
import { ProfileStatus } from 'Components/Profile/ProfileInfo/ProfileStatus'
import userPhoto from 'assets/img/user.png'
import { ProfileReduxDataForm } from 'Components/Profile/ProfileInfo/ProfileDataForm'
import { ProfileResponseType } from 'api/profileApi'

export type ProfileInfo = {
    profile: ProfileResponseType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (formData: FormDataType) => any
}

export type FormDataType = {
    fullName: string
    aboutMe: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
}

export const ProfileInfo: React.FC<ProfileInfo> = ({
                                                       profile,
                                                       status,
                                                       updateStatus,
                                                       isOwner,
                                                       savePhoto,
                                                       saveProfile
                                                   }) => {
    const [editMode, setEditMode] = useState(false)

    if (!profile) return <Preloader />

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget && e.currentTarget.files && e.currentTarget.files.length) {
            savePhoto(e.currentTarget.files[0])
        }
    }
    const onSubmit = (formData: FormDataType) => {
        saveProfile(formData).then(() => {
            setEditMode(false)
        })
    }

    return (
        <div className={s.descriptionBlock}>
            <div>
                <div className={s.imageBlock}>
                    <img
                        src={profile.photos.large || userPhoto}
                        className={s.mainPhoto}
                        alt='logo-main' />

                    {isOwner && <input className={s.input} type={'file'} onChange={onMainPhotoSelected} />}
                </div>
                <ProfileStatus status={status} updateStatus={updateStatus} />
            </div>

            {editMode ? <ProfileReduxDataForm initialValues={profile} onSubmit={onSubmit} profile={profile} /> :
                <ProfileData profile={profile} isOwner={isOwner} goToEditMode={() => {
                    setEditMode(true)
                }} />}
        </div>
    )
}

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