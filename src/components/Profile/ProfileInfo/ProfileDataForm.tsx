import s from 'components/profile/profileInfo/ProfileInfo.module.css'
import React from 'react'
import { Input, Textarea } from 'components/common/formsControls/FormControls'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { ProfileResponseType } from 'api/profileApi'
import { createField } from 'utils/createField/createField'

type ProfileFormData = {
    fullName: string
    aboutMe: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
}

type ProfileFormPropertiesType = Extract<keyof ProfileFormData, string>
type ProfileOwnProps = {
    profile: ProfileResponseType | null
}

const ProfileDataForm: React.FC<InjectedFormProps<ProfileResponseType, ProfileOwnProps> & ProfileOwnProps> = ({
                                                                                                              handleSubmit,
                                                                                                              error,
                                                                                                              profile
                                                                                                          }) => {
    return (
        <form className={s.infoBlock} onSubmit={handleSubmit}>
            <div>
                <button>Сохранить профиль</button>
                {error && <div className={s.error}> {error} </div>}
            </div>

            <h4>Full name: </h4>
            {createField<ProfileFormPropertiesType>('Полное имя...', 'fullName', [], Input)}
            <h4>Обо мне: </h4>
            {createField<ProfileFormPropertiesType>('Обо мне...', 'aboutMe', [], Textarea)}
            <h4>Поиск работы:</h4>
            {createField<ProfileFormPropertiesType>('', 'lookingForAJob', [], Input, { type: 'checkbox' })}
            <h4>Описание:</h4>
            {createField<ProfileFormPropertiesType>('Описание...', 'lookingForAJobDescription', [], Textarea, { type: 'checkbox' })}
            <div>
                <h4> Контакты: </h4>
                {profile?.contacts && Object.keys(profile.contacts).map((key) => {
                    return (
                        <div key={key}>
                            <b>{key}: </b>
                            {createField(`${key}`, 'contacts.' + key, [], Input)}
                        </div>
                    )
                })}
            </div>
        </form>
    )
}

export const ProfileReduxDataForm = reduxForm<ProfileResponseType, ProfileOwnProps>({ form: 'edit-profile' })(ProfileDataForm)