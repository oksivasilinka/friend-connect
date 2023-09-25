import s from "Components/Profile/ProfileInfo/ProfileInfo.module.css"
import React from "react"
import { Input, Textarea } from "Components/common/formsControls/FormControls"
import { createField } from "Components/login/Login"
import { InjectedFormProps, reduxForm } from "redux-form"
import { FormDataType } from "Components/Profile/ProfileInfo/ProfileInfo"
import { ProfileResponseType } from "api/profileApi"


const ProfileDataForm: React.FC<InjectedFormProps<FormDataType,ProfileOwnProps > & ProfileOwnProps> = ({ handleSubmit, error, profile }) => {


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
type ProfileFormPropertiesType = Extract<keyof FormDataType, string>
type ProfileOwnProps = {
    profile: ProfileResponseType | null
}

export const ProfileReduxDataForm = reduxForm<FormDataType, ProfileOwnProps>({ form: "edit-profile" })(ProfileDataForm)