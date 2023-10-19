import React, { useEffect } from 'react'
import s from './Header.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AppRootStateType, useAppDispatch } from 'redux/store'
import { logOut } from 'redux/authReducer'
import { Avatar, Button, Col, Row } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons'
import { Header } from 'antd/es/layout/layout'

type Props = {
    collapsed: boolean
    setCollapsed: (collapsed: boolean) => void
}

export const AppHeader = ({ collapsed, setCollapsed }: Props) => {

    const isAuth = useSelector((state: AppRootStateType) => state.auth.isAuth)
    const login = useSelector((state: AppRootStateType) => state.auth.login)
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
            <Row>
                <Col span={19}>
                    <Button
                        type='text'
                        icon={collapsed
                            ? <MenuUnfoldOutlined rev={undefined} />
                            : <MenuFoldOutlined rev={undefined} />}
                        onClick={collapsedMenuHandler}
                        className={s.iconMenu} />
                </Col>

                {isAuth
                    ? <>
                        <Col span={2}>
                            {login}
                        </Col>

                        <Col span={1}>
                            <Avatar alt={login || ''}
                                    className={s.avatar}
                                    icon={<UserOutlined rev={undefined} />}
                            />
                        </Col>

                        <Col span={2}>
                            <Button onClick={logoutHandler}>Log Out</Button>
                        </Col>
                    </>

                    : <Col span={2}>
                        <Button>
                            <Link to={'/login'}>Login</Link>
                        </Button>
                    </Col>
                }

            </Row>
        </Header>
    )
}