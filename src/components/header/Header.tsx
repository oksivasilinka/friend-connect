import React from 'react'
import s from './Header.module.css'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootStateType } from 'redux/store'
import { logOut } from 'redux/authReducer'
import { Avatar, Button, Col, Row, theme } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons'
import { Header } from 'antd/es/layout/layout'

type Props = {
    collapsed: boolean
    setCollapsed: (collapsed: boolean) => void
}


export const AppHeader = ({ collapsed, setCollapsed }: Props) => {

    const {
        token: { colorBgContainer }
    } = theme.useToken()


    const isAuth = useSelector((state: AppRootStateType) => state.auth.isAuth)
    const login = useSelector((state: AppRootStateType) => state.auth.login)
    const dispatch = useDispatch()
    const history = useHistory()

    const logoutHandler = () => {
        dispatch(logOut())
        history.push('/login')
    }
    {
        if (!isAuth) {
            history.push('/login')
        }
    }

    return (
        <div>
            <Header style={{ padding: 0, background: colorBgContainer }}>
                <Row>
                    <Col span={20}>
                        <Button
                            type='text'
                            icon={collapsed ? <MenuUnfoldOutlined rev={undefined} /> :
                                <MenuFoldOutlined rev={undefined} />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64
                            }}
                        />
                    </Col>

                    {isAuth ? <>
                            <Col span={1}>
                                {login}
                            </Col>

                            <Col span={1}>
                                <Avatar alt={login || ''}
                                        style={{ backgroundColor: '#87d068' }}
                                        icon={<UserOutlined rev={undefined} />}
                                />
                            </Col>

                            <Col span={2}>
                                <Button className={s.button} onClick={logoutHandler}>Log Out</Button>
                            </Col>


                        </>
                        :
                        <Col span={2}><Button><Link to={'/login'}>Login</Link></Button></Col>
                    }

                </Row>
            </Header>
        </div>
    )
}