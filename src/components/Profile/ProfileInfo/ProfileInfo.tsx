import React, { ChangeEvent, useState } from 'react'
import s from 'components/profile/profileInfo/ProfileInfo.module.css'
import userPhoto from 'assets/img/user.png'
import { ProfileResponseType } from 'api/profileApi'
import { ProfileData, ProfileReduxDataForm, ProfileStatus } from 'components/profile/profileInfo'
import { Preloader } from 'components/common/preloader'

export type ProfileInfo = {
    profile: ProfileResponseType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (formData: ProfileFormData) => any
}

export type ProfileFormData = {
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
    const onSubmit = (formData: ProfileFormData) => {
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

