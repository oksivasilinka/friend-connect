import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { LoginForm , isAuthSelector} from 'pages/loginPage/index'
import { Typography } from 'components/common'

export const Login = () => {

    const isAuth = useSelector(isAuthSelector)

    if (isAuth) {
        return <Navigate to={'/profile'} />
    }
    return (
        <section>
            <Typography variant={'h2'} as={'h2'}>Login</Typography>
            <LoginForm />
        </section>
    )
}


