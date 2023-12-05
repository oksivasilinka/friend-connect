import { useEffect } from 'react'
import s from './Header.module.css'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AppRootStateType, useAppDispatch } from 'redux/store'
import { logOut } from 'redux/authReducer'
import { profileSelector } from 'components/profilePage/model/profileSelector'
import userPhoto from 'assets/img/user.png'
import logo from 'assets/img/logo.svg'
import { Button, Typography } from 'components/common'

export const AppHeader = () => {
    const isAuth = useSelector((state: AppRootStateType) => state.auth.isAuth)
    const login = useSelector((state: AppRootStateType) => state.auth.login)
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
            <img className={s.logo} src={logo} alt={'logo'} />
            {isAuth && (
                <div className={s.loginInfo}>
                    <Typography variant={'body1'}>{login}</Typography>
                    <img alt={login || ''}
                         className={s.avatar}
                         src={profile?.photos.large || userPhoto}
                    />
                    <Button callback={logoutHandler}>
                        <Typography variant={'body2'}>Log Out</Typography>
                    </Button>
                </div>
            )}
            {!isAuth && (
                <Button>
                    <Typography variant={'body2'} as={'a'} href={'/login'} className={s.link}>Login</Typography>
                </Button>
            )}


        </header>
    )
}