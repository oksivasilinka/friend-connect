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
export const ProfileInfo = (props: ProfileInfo) => {
    if (!props.profile) {
        return <Preloader/>
    }

    return (
        <div>
            <div className={s.descriptionBlock}>
                <img
                    src={props.profile.photos.large}
                    alt="logo-main"/>
                <div className={s.infoBlock}>
                    <h2>{props.profile.fullName}</h2>

                    <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>

                    <h4>Обо мне</h4>
                    {props.profile.aboutMe}
                    <h4>Поиск работы:</h4> {props.profile.lookingForAJob ? 'Ищу работу' : 'Не ищу работу'}
                    <h4>Описание:</h4> {props.profile.lookingForAJobDescription}
                    <div>
                        <h4>Контакты:</h4>
                        <div>facebook:
                            {props.profile.contacts.facebook === null ? '-' : props.profile.contacts.facebook}
                        </div>
                        <div>website:
                            {props.profile.contacts.website === null ? '-' : props.profile.contacts.website}
                        </div>
                        <div> vk:
                            {props.profile.contacts.vk === null ? '-' : props.profile.contacts.vk}
                        </div>
                        <div> twitter:
                            {props.profile.contacts.twitter === null ? '-' : props.profile.contacts.twitter}
                        </div>
                        <div> instagram:
                            {props.profile.contacts.instagram === null ? '-' : props.profile.contacts.instagram}
                        </div>
                        <div> youtube:
                            {props.profile.contacts.youtube === null ? '-' : props.profile.contacts.youtube}
                        </div>
                        <div> github:
                            {props.profile.contacts.github === null ? '-' : props.profile.contacts.github}
                        </div>
                        <div> mainLink:
                            {props.profile.contacts.mainLink === null ? '-' : props.profile.contacts.mainLink}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}