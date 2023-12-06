import { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'redux/store'
import { logOut } from 'redux/authReducer'
import { loginSelector, profileSelector } from 'components/profilePage/model/profileSelector'
import userPhoto from 'assets/img/user.png'
import logo from 'assets/img/logo.svg'
import { Button, Typography } from 'components/common'
import { isAuthSelector } from 'components/login/model'
import s from './Header.module.css'

export const AppHeader = () => {
    const isAuth = useSelector(isAuthSelector)
    const login = useSelector(loginSelector)
    const profile = useSelector(profileSelector)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (!isAuth) {
            navigate('/login')
        }
    }, [isAuth, navigate])

    const logoutHandler = () => {
        dispatch(logOut())
        navigate('/login')
    }


    return (
        <header className={s.headerBlock}>
            <NavLink to={'/'}>
                <img className={s.logo} src={logo} alt={'logo'} />
            </NavLink>
            {isAuth && (
                <div className={s.loginInfo}>
                    <Typography variant={'body1'} className={s.login}>{login}</Typography>
                    <img alt={login || ''}
                         className={s.avatar}
                         src={profile?.photos.large || userPhoto}
                    />
                    <Button callback={logoutHandler}>
                        <Typography variant={'subtitle3'}>Log Out</Typography>
                    </Button>
                </div>
            )}
            {!isAuth && (
                <Button className={s.button}>
                    <NavLink to={'/login'}  className={s.link}>
                        <Typography variant={'subtitle3'}>Login</Typography>
                    </NavLink>
                </Button>
            )}
        </header>
    )
}