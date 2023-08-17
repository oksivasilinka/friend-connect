import React from "react";
import s from './ProfileInfo.module.css'
import {ProfileType} from "../../../../redux/profileReducer";
import {Preloader} from "../../../common/preloader/preloader";
import {ProfileStatus} from "./ProfileStatus";


export type ProfileInfo = {
    profile: ProfileType | null
}
export const ProfileInfo = (props: ProfileInfo) => {
    if (!props.profile) {
        return <Preloader/>
    }

    return (
        <div>
            {/*<img*/}
            {/*    src="https://thumbs.dreamstime.com/b/%D1%88%D0%B8%D1%80%D0%BE%D0%BA%D0%B0%D1%8F-%D0%BF%D0%B0%D0%BD%D0%BE%D1%80%D0%B0%D0%BC%D0%B0-%D0%B4%D0%BE%D1%80%D0%BE%D0%B3%D0%B8-%D0%B0%D1%81%D1%84%D0%B0%D0%BB%D1%8C%D1%82%D0%B0-%D0%B2-%D1%81%D0%B5%D0%BB%D1%8C%D1%81%D0%BA%D0%BE%D0%B9-%D0%BC%D0%B5%D1%81%D1%82%D0%BD%D0%BE%D1%81%D1%82%D0%B8-%D0%BB%D0%B5%D1%82%D0%BD%D0%B8%D0%B9-%D0%B4%D0%B5%D0%BD%D1%8C-%D0%BD%D0%B0-214241529.jpg"*/}
            {/*    alt="'main"/>*/}
            <div className={s.descriptionBlock}>
                <img
                    src={props.profile.photos.large}
                    alt="logo-main"/>
                <div className={s.infoBlock}>
                    <h2>{props.profile.fullName}</h2>


                    <ProfileStatus status={'dskfjsdfa'}/>

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