import s from "Components/Profile/MyPosts/ProfileInfo/ProfileInfo.module.css";
import React from "react";
import {Input, Textarea} from "Components/common/formsControls/FormControls";
import {createField} from "Components/login/Login";
import {InjectedFormProps, reduxForm} from "redux-form";
import {FormDataType} from "Components/Profile/MyPosts/ProfileInfo/ProfileInfo";


const ProfileDataForm: React.FC<InjectedFormProps<FormDataType>> = ({handleSubmit}) => {

    return (
        <form className={s.infoBlock} onSubmit={handleSubmit}>
            <div>
                <button onClick={() => {
                }}>Сохранить профиль
                </button>
            </div>
            <h4>Full name: </h4> {createField('Полное имя...', 'fullName', [], Input)}
            <h4>Обо мне: </h4> {createField('Обо мне...', 'aboutMe', [], Textarea)}
            <h4>Поиск работы:</h4> {createField('', 'lookingForAJob', [], Input, {type: 'checkbox'})}
            <h4>Описание:</h4> {createField('Описание...', 'lookingForAJobDescription', [], Textarea, {type: 'checkbox'})}
            <div>
            {/*    <h4> Контакты: </h4>*/}
            {/*    {Object.keys(profile.contacts).map(key => {*/}

            {/*        // @ts-ignore*/}
            {/*        return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>*/}
            {/*    })}*/}
            </div>
        </form>
    )
}


export const ProfileReduxDataForm = reduxForm<FormDataType>({form: 'edit-profile'})(ProfileDataForm)