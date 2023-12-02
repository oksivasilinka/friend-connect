import React, { useEffect } from 'react'
import s from './Header.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AppRootStateType, useAppDispatch } from 'redux/store'
import { logOut } from 'redux/authReducer'
import { Button } from 'antd'
import { Header } from 'antd/es/layout/layout'
import { profileSelector } from 'components/profile/profileSelector'
import userPhoto from 'assets/img/user.png'
import logo from 'assets/img/logo.svg'

type Props = {
    collapsed: boolean
    setCollapsed: (collapsed: boolean) => void
}

export const AppHeader = ({ collapsed, setCollapsed }: Props) => {

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

    const collapsedMenuHandler = () => {
        setCollapsed(!collapsed)
    }

    return (
        <Header className={s.headerBlock}>
            <img className={s.logo} src={logo} alt={'logo'} />
            {isAuth && (
                <div className={s.loginInfo}>
                    <span>{login}</span>
                    <img alt={login || ''}
                         className={s.avatar}
                         src={profile?.photos.large || userPhoto}
                    />
                    <Button type={'link'} onClick={logoutHandler}>Log Out</Button>
                </div>
            )}
            {!isAuth && (
                <div>
                    <Button>
                        <Link to={'/login'}>Login</Link>
                    </Button>
                </div>
            )}


        </Header>
    )
}