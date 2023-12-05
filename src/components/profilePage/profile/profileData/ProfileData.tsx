import { ProfileResponseType } from 'api/profileApi'
import { Contact } from 'components/profilePage/profile/profileData/contact/Contact'
import s from './ProfileData.module.css'


type Props = {
    profile: ProfileResponseType
}

export const ProfileData = ({ profile }: Props) => {
    return (
        <div className={s.wrapper}>

            <div className={s.item}>
                <span className={s.subtitle}>About me:{' '} </span>
                <span className={s.text}>{profile.aboutMe}</span>
            </div>
            <div className={s.item}>
                <span className={s.subtitle}>My Skills:{' '} </span>
                <span className={s.text}>{profile.lookingForAJobDescription}</span>
            </div>


            <div className={`${s.item} ${s.contacts}`}>
                <span className={s.subtitle}> Contacts: </span>
                {profile.contacts && Object.entries(profile.contacts).map(([key, value]) => {
                    return <Contact key={key} contactTitle={key} contactValue={value} />
                })}
            </div>
        </div>
    )
}

