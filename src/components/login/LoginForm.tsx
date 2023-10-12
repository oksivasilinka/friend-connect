import React from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { isAuthSelector } from 'components/login/loginSelectors'
import { Button, Checkbox, Col, Form, Input, Row, Typography } from 'antd'
import { AppRootStateType } from 'redux/store'
import { useLogin } from 'components/login/useLogin'
import s from './LoginForm.module.css'

const { Title, Text } = Typography

export const LoginForm = () => {

    const error = useSelector((state: AppRootStateType) => state.app.error)
    const captchaUrl = useSelector((state: AppRootStateType) => state.auth.captchaUrl)
    const { formik } = useLogin()
    const isAuth = useSelector(isAuthSelector)

    if (isAuth) {
        return <Redirect to={'/'} />
    }

    return (
        <Form onFinish={formik.handleSubmit}>
            <Title level={4}>Email</Title>
            <Input placeholder={'Enter your email'} style={{ maxWidth: 500 }} {...formik.getFieldProps('email')} />
            <Row>
                {formik.touched.email && formik.errors.email && (
                    <Text type='danger'>{formik.errors.email}</Text>
                )}
            </Row>

            <Title level={4}>Password</Title>
            <Input placeholder={'Enter your password'} style={{ maxWidth: 500 }}
                   type='password'
                   {...formik.getFieldProps('password')}
            />

            <Row>
                {formik.touched.password && formik.errors.password && (
                    <Text type='danger'>{formik.errors.password}</Text>
                )}
            </Row>

            <Row className={s.rememberMeBlock}>
                <Checkbox className={s.checkbox}
                          checked={formik.values.rememberMe}
                          {...formik.getFieldProps('rememberMe')} />
                <Title className={s.titleCheckbox} level={5}>Remember me</Title>
                {/*</Checkbox>*/}
            </Row>

            <Row>
                {error ? (
                    <Text type='danger'>{error}</Text>
                ) : null}
            </Row>

            {captchaUrl && <>
                <img className={s.captchaImage} src={captchaUrl} alt='Captcha' />
                <Col>
                    <Input placeholder={'Enter captcha'} className={s.captchaInput}
                           {...formik.getFieldProps('captcha')}
                    />
                </Col>
            </>}

            <Button className={s.buttonLogin} type='primary' htmlType='submit'> Login </Button>

        </Form>
    )
}

