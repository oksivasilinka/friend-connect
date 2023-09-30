import s from "components/profile/profileInfo/ProfileInfo.module.css"
import React from "react"
import { Input, Textarea } from "components/common/formsControls/FormControls"
import { createField } from "components/login/Login"
import { InjectedFormProps, reduxForm } from "redux-form"
import { ProfileFormData } from "components/profile/profileInfo"
import { ProfileResponseType } from "api/profileApi"


const ProfileDataForm: React.FC<InjectedFormProps<ProfileFormData,ProfileOwnProps > & ProfileOwnProps> = ({ handleSubmit, error, profile }) => {


    return (
        <form className={s.infoBlock} onSubmit={handleSubmit}>
            <div>
                <button onClick={() => {
                }}>Сохранить профиль
                </button>

                {error && <div className={s.error}> {error} </div>}

            </div>
            <h4>Full name: </h4> {createField<ProfileFormPropertiesType>("Полное имя...", "fullName", [], Input)}
            <h4>Обо мне: </h4> {createField<ProfileFormPropertiesType>("Обо мне...", "aboutMe", [], Textarea)}
            <h4>Поиск работы:</h4> {createField<ProfileFormPropertiesType>("", "lookingForAJob", [], Input, { type: "checkbox" })}
            <h4>Описание:</h4> {createField<ProfileFormPropertiesType>("Описание...", "lookingForAJobDescription", [], Textarea, { type: "checkbox" })}
            <div>
                <h4> Контакты: </h4>

                {profile?.contacts && Object.keys(profile.contacts).map((key) => {
                    return (
                        <div key={key}>
                            <b>{key}: </b>
                            {createField(`${key}`, "contacts." + key, [], Input)}
                        </div>
                    )
                })}
            </div>
        </form>
    )
}
type ProfileFormPropertiesType = Extract<keyof ProfileFormData, string>
type ProfileOwnProps = {
    profile: ProfileResponseType | null
}

export const ProfileReduxDataForm = reduxForm<ProfileFormData, ProfileOwnProps>({ form: "edit-profile" })(ProfileDataForm)