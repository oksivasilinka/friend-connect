import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { isAuthSelector } from 'components/login/loginSelectors'
import { LoginForm } from 'components/login/LoginForm'
import { Typography } from 'antd'

const { Title } = Typography

export const Login = () => {

    const isAuth = useSelector(isAuthSelector)

    if (isAuth) {
        return <Navigate to={'/profile'} />
    }
    return (
        <div>
            <Title level={1}>Login</Title>
            <LoginForm />
        </div>
    )
}


