import s from "Components/Profile/MyPosts/ProfileInfo/ProfileInfo.module.css";
import React from "react";
import {Input, Textarea} from "Components/common/formsControls/FormControls";
import {createField} from "Components/login/Login";
import {InjectedFormProps, reduxForm} from "redux-form";
import {useSelector} from "react-redux";
import {AppRootStateType} from "redux/store";
import {FormDataType} from "Components/Profile/MyPosts/ProfileInfo/ProfileInfo";
import {ProfileType} from "redux/profileReducer";


const ProfileDataForm: React.FC<InjectedFormProps<FormDataType>> = ({handleSubmit, error}) => {

    const profile = useSelector<AppRootStateType, ProfileType>(state => state.profilePage.profile)

    return (
        <form className={s.infoBlock} onSubmit={handleSubmit}>
            <div>
                <button onClick={() => {
                }}>Сохранить профиль
                </button>

                {error && <div className={s.formSummaryError}> {error} </div>}

            </div>
            <h4>Full name: </h4> {createField('Полное имя...', 'fullName', [], Input)}
            <h4>Обо мне: </h4> {createField('Обо мне...', 'aboutMe', [], Textarea)}
            <h4>Поиск работы:</h4> {createField('', 'lookingForAJob', [], Input, {type: 'checkbox'})}
            <h4>Описание:</h4> {createField('Описание...', 'lookingForAJobDescription', [], Textarea, {type: 'checkbox'})}
            <div>
                <h4> Контакты: </h4>

                {Object.keys(profile.contacts).map((key) => {
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


export const ProfileReduxDataForm = reduxForm<FormDataType>({form: 'edit-profile'})(ProfileDataForm);