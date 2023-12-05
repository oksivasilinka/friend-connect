import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { isAuthSelector } from 'components/login/model'
import { LoginForm } from 'components/login/LoginForm'
import { Typography } from 'components/common'

export const Login = () => {

    const isAuth = useSelector(isAuthSelector)

    if (isAuth) {
        return <Navigate to={'/profile'} />
    }
    return (
        <>
            <Typography variant={'h2'} as={'h2'}>Login</Typography>
            <LoginForm />
        </>
    )
}


