import React from 'react'
import { Field, InjectedFormProps, reduxForm, WrappedFieldProps } from 'redux-form'
import { Input } from '../common/formsControls/FormControls'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import s from '../common/formsControls/FormControls.module.css'
import { FieldValidatorType, requiredField } from 'utils/validators/validators'
import { AppRootStateType } from 'redux/store'
import { login } from 'redux/authReducer'


export const LoginForm: React.FC<InjectedFormProps<FormDataType, LoginOwnProps> & LoginOwnProps> = ({
                                                                                                        handleSubmit,
                                                                                                        error,
                                                                                                        captchaUrl
                                                                                                    }) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField<LoginFormPropertiesType>('Email', 'email', [requiredField], Input)}
            {createField<LoginFormPropertiesType>('Password', 'password', [requiredField], Input, {
                type: 'password'
            })}
            {createField<LoginFormPropertiesType>(undefined, 'rememberMe', [], Input, {
                type: 'checkbox'
            }, 'remember me')}

            {captchaUrl && <img src={captchaUrl} alt='Captcha' />}
            {captchaUrl && createField<LoginFormPropertiesType>('Captcha', 'captcha', [requiredField], Input)}
            {error && <div className={s.formSummaryError}>{error}</div>}

            <div>
                <button>login</button>
            </div>
        </form>
    )
}


const Login: React.FC<MapStateToPropsType & MapDispatchToPropsType> = ({ login, isAuth, captchaUrl }) => {
    const onSubmit = (formData: FormDataType) => {
        login(formData.email, formData.password, formData.rememberMe, formData.captcha)
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

export function createField <FormKeysType extends string> (placeholder: string | undefined,
                            name: FormKeysType,
                            validators: FieldValidatorType[],
                            component: React.FC<WrappedFieldProps>,
                            props = {},
                            textInput = '') {
    return (
        <div>
            <Field
                placeholder={placeholder}
                name={name}
                validate={validators}
                component={component}
                {...props}
            />
            {textInput}
        </div>
    )
}


const LoginReduxForm = reduxForm<FormDataType, LoginOwnProps>({ form: 'login' })(LoginForm)

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl
    }
}

type FormDataType = {
    email: string;
    password: string;
    rememberMe: boolean;
    captcha: string | null;
};

type LoginFormPropertiesType = Extract<keyof FormDataType, string>
type LoginOwnProps = {
    captchaUrl: string | null
}

type MapStateToPropsType = {
    isAuth: boolean;
    captchaUrl: string | null;
};

type MapDispatchToPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string | null) => void;
};

export default connect(mapStateToProps, { login })(Login)