import React, { useEffect } from 'react'
import s from './Header.module.css'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AppRootStateType, useAppDispatch } from 'redux/store'
import { logOut } from 'redux/authReducer'
import { profileSelector } from 'components/profile/profileSelector'
import userPhoto from 'assets/img/user.png'
import logo from 'assets/img/logo.svg'

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
                    <span>{login}</span>
                    <img alt={login || ''}
                         className={s.avatar}
                         src={profile?.photos.large || userPhoto}
                    />
                    <button className={s.button} onClick={logoutHandler}>Log Out</button>
                </div>
            )}
            {!isAuth && (
                    <button className={s.button}>
                        <a href={'/login'}>Login</a>
                    </button>
            )}


        </header>
    )
}