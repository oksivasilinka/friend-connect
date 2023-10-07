import React from 'react'
import { InjectedFormProps } from 'redux-form'
import { requiredField } from 'utils/validators/validators'
import { Input } from 'components/common/formsControls/FormControls'
import s from 'components/common/formsControls/FormControls.module.css'
import { LoginFormData, LoginOwnProps } from 'components/login/Login'
import { createField } from 'utils/createField/createField'

type LoginFormProperties = Extract<keyof LoginFormData, string>
type Props = InjectedFormProps<LoginFormData, LoginOwnProps> & LoginOwnProps

export const LoginForm = ({ handleSubmit, error, captchaUrl }: Props) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField<LoginFormProperties>('Email', 'email', [requiredField], Input)}
            {createField<LoginFormProperties>('Password', 'password', [requiredField], Input, {
                type: 'password'
            })}
            {createField<LoginFormProperties>(undefined, 'rememberMe', [], Input, {
                type: 'checkbox'
            }, 'remember me')}

            {captchaUrl && <img src={captchaUrl} alt='Captcha' />}
            {captchaUrl && createField<LoginFormProperties>('Captcha', 'captcha', [requiredField], Input)}
            {error && <div className={s.formSummaryError}>{error}</div>}

            <div>
                <button>login</button>
            </div>
        </form>
    )
}

