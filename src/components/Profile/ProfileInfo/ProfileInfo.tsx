import React, { ChangeEvent, useState } from 'react'
import s from 'components/profile/profileInfo/ProfileInfo.module.css'
import userPhoto from 'assets/img/user.png'
import { ProfileData, ProfileReduxDataForm, ProfileStatus } from 'components/profile/profileInfo'
import { Preloader } from 'components/common/preloader'
import { useSelector } from 'react-redux'
import { profileSelector } from 'components/profile/profileSelector'
import { savePhoto, saveProfile } from 'redux/profileReducer'
import { ProfileResponseType } from 'api/profileApi'
import { useAppDispatch } from 'redux/store'
import { Button, Card, Col, Row } from 'antd'

type Props = {
    isOwner: boolean
}

export const ProfileInfo = ({ isOwner }: Props) => {

    const [editMode, setEditMode] = useState(false)
    const profile = useSelector(profileSelector)
    const dispatch = useAppDispatch()


    if (!profile) return <Preloader />

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget && e.currentTarget.files && e.currentTarget.files.length) {
            dispatch(savePhoto(e.currentTarget.files[0]))
        }
    }
    const onSubmit = async (formData: ProfileResponseType) => {
        try {
            dispatch(saveProfile(formData))
            setEditMode(false)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Card className={s.wrapper}>
            <div>
                <img
                    src={profile.photos.large || userPhoto}
                    className={s.mainPhoto}
                    alt='logo-main' />
                {isOwner && (<>
                    <input type={'file'} onChange={onMainPhotoSelected} />
                    < ProfileStatus goToEditMode={() => {
                        setEditMode(true)
                    }} />
                </>)
                }</div>

            <div>
                {editMode
                    ? <ProfileReduxDataForm initialValues={profile} onSubmit={onSubmit} profile={profile} />
                    : <ProfileData profile={profile} />}</div>
        </Card>
    )
}

