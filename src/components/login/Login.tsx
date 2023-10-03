import React, { FC } from 'react'
import { reduxForm } from 'redux-form'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login } from 'redux/authReducer'
import { captchaUrlSelector, isAuthSelector } from 'components/login/loginSelectors'
import { LoginForm } from 'components/login/LoginForm'

export type LoginFormData = {
    email: string;
    password: string;
    rememberMe: boolean;
    captcha: string | null;
};

export type LoginOwnProps = {
    captchaUrl: string | null
}

export const Login: FC = () => {
    const captchaUrl = useSelector(captchaUrlSelector)
    const isAuth = useSelector(isAuthSelector)
    const dispatch = useDispatch()

    const onSubmit = (formData: LoginFormData) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }
    if (isAuth) {
        return <Redirect to={'/profile'} />
    }
    return (
        <div>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
        </div>
    )
}

const LoginReduxForm = reduxForm<LoginFormData, LoginOwnProps>({ form: 'login' })(LoginForm)





