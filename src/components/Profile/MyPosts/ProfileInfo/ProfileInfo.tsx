import React from "react";
import s from './ProfileInfo.module.css'
import {ProfileType} from "../../../../redux/profileReducer";
import {Preloader} from "../../../common/preloader/preloader";
import {ProfileStatusWithHooks} from "./ProfileStatusWithHooks";


export type ProfileInfo = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
}

export const ProfileInfo: React.FC<ProfileInfo> = ({profile, status, updateStatus}) => {
    if (!profile) return <Preloader/>

    return (
            <div className={s.descriptionBlock}>
                <img
                    src={profile.photos.large}
                    alt="logo-main"/>
                <div className={s.infoBlock}>
                    <h2>{profile.fullName}</h2>

                    <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>

                    <h4>Обо мне</h4>
                    {profile.aboutMe}
                    <h4>Поиск работы:</h4> {profile.lookingForAJob ? 'Ищу работу' : 'Не ищу работу'}
                    <h4>Описание:</h4> {profile.lookingForAJobDescription}
                    <div>
                        <h4> Контакты: </h4>
                        <div> facebook: {profile.contacts.facebook || ' -'} </div>
                        <div> website: {profile.contacts.website || ' -'} </div>
                        <div> vk: {profile.contacts.vk || ' -'} </div>
                        <div> twitter: {profile.contacts.twitter || ' -'} </div>
                        <div> instagram: {profile.contacts.instagram || ' -'} </div>
                        <div> youtube: {profile.contacts.youtube || ' -'} </div>
                        <div> github: {profile.contacts.github || ' -'} </div>
                        <div> mainLink: {profile.contacts.mainLink || ' -'} </div>
                    </div>
                </div>
            </div>
    )
}