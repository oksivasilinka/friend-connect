import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { captchaUrlSelector, errorSelector, isAuthSelector, useLogin } from 'components/login/model'
import { Subtitle } from 'components/common'
import s from './LoginForm.module.css'

export const LoginForm = () => {

    const { formik } = useLogin()
    const { errors, handleSubmit, getFieldProps, touched, values } = formik
    const captchaUrl = useSelector(captchaUrlSelector)
    const isAuth = useSelector(isAuthSelector)
    const error = useSelector(errorSelector)

    if (isAuth) {
        return <Navigate to={'/'} />
    }

    return (
        <form onSubmit={handleSubmit} className={s.form}>
            <Subtitle title={'Email'} />
            <input placeholder={'Enter your email'} className={s.input} {...getFieldProps('email')} />
            {touched.email && errors.email && (
                <span className={s.error}>{errors.email}</span>
            )}


            <Subtitle title={'Password'} />
            <input placeholder={'Enter your password'} className={s.input}
                   type='password'
                   {...getFieldProps('password')}
            />
            {touched.password && errors.password && (
                <span className={s.error}>{errors.password}</span>
            )}


            <div className={s.rememberMeBlock}>
                <input type={'checkbox'} className={s.checkbox}
                       checked={values.rememberMe}
                       {...getFieldProps('rememberMe')} />
                <span className={s.titleCheckbox}>Remember me</span>
            </div>


            {error ? (
                <span className={s.error}>{error}</span>
            ) : null}


            {captchaUrl && <>
                <img className={s.captchaImage} src={captchaUrl} alt='Captcha' />

                <input placeholder={'Enter captcha'} className={`${s.input} ${s.captcha}`}
                       {...getFieldProps('captcha')}
                />
            </>}

            <button className={s.buttonLogin} type='submit'> Login</button>

        </form>
    )
}

