import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../common/formsControls/FormControls";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import s from "../common/formsControls/FormControls.module.css";
import {requiredField} from "utils/validators/validators";
import {AppRootStateType} from "redux/store";
import {login} from "redux/authReducer";

type FormDataType = {
    email: string;
    password: string;
    rememberMe: boolean;
    captcha: string | null;
};

type PropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string | null) => void;
    isAuth: boolean;
    captchaUrl: string | null;
};

const Login: React.FC<PropsType> = ({login, isAuth, captchaUrl}) => {
    const onSubmit = (formData: FormDataType) => {
        login(formData.email, formData.password, formData.rememberMe, formData.captcha);
    };
    if (isAuth) {
        return <Redirect to={"/profile"}/>;
    }
    return (
        <div>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
        </div>
    );
};

export const createField = (placeholder: string | null, name: string, validators: any, component: any, props = {}, textInput = "") => (
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
);

export const LoginForm: React.FC<InjectedFormProps<FormDataType> & { captchaUrl: string | null }> = ({
                                                                                                         handleSubmit,
                                                                                                         error,
                                                                                                         captchaUrl,
                                                                                                     }) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField("Email", "email", [requiredField], Input)}
            {createField("Password", "password", [requiredField], Input, {
                type: "password",
            })}
            {createField(null, "rememberMe", [], Input, {
                type: "checkbox",
            }, 'remember me')}

            {captchaUrl && <img src={captchaUrl} alt="Captcha"/>}
            {captchaUrl &&  createField("Captcha", "captcha", [requiredField], Input)}
            {error && <div className={s.formSummaryError}>{error}</div>}

            <div>
                <button>login</button>
            </div>
        </form>
    );
};

const LoginReduxForm = reduxForm<FormDataType, { captchaUrl: string | null }>({
    form: "login",
})(LoginForm as any);

type MapStateToPropsType = {
    isAuth: boolean;
    captchaUrl: string | null;
};

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl,
    };
};

export default connect(mapStateToProps, {login})(Login);