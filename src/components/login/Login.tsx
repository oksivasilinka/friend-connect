import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { isAuthSelector } from 'components/login/model'
import { LoginForm } from 'components/login/LoginForm/LoginForm'
import { Title } from 'components/common/title/Title'

export const Login = () => {

    const isAuth = useSelector(isAuthSelector)

    if (isAuth) {
        return <Navigate to={'/profile'} />
    }
    return (
        <>
            <Title title={'Login'} />
            <LoginForm />
        </>
    )
}


