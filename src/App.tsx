import React, { FC, Suspense, useEffect, useState } from 'react'
import './App.css'
import { Nav } from 'components/navigation/Nav'
import { Redirect, Route } from 'react-router-dom'
import { News } from 'components/news/News'
import { Music } from 'components/music/Music'
import { Settings } from 'components/settings/Settings'
import { UsersPage } from 'components/users/UsersPage'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootStateType } from 'redux/store'
import { Preloader } from 'components/common/preloader'
import { initializeApp } from 'redux/appReducer'
import { Login } from 'components/login/Login'
import { DialogsPage } from 'components/dialogs/DialogsPage'
import { ProfilePage } from 'components/profile/ProfileContainer'
import { Layout, theme } from 'antd'
import { AppHeader } from 'components/header/Header'


const { Sider, Content } = Layout
const App: FC = () => {
    const [collapsed, setCollapsed] = useState(false)
    const {
        token: { colorBgContainer }
    } = theme.useToken()
    const initialized = useSelector((state: AppRootStateType) => state.app.initialized)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeApp())
    })

    if (!initialized) return <Preloader />
    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className='demo-logo-vertical' />
                <Nav />
            </Sider>
            <Layout>
                <AppHeader collapsed={collapsed} setCollapsed={setCollapsed} />

                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer
                    }}
                >
                    < Suspense fallback={<Preloader />}>
                        <Route exact path='/' render={() => <Redirect to={'/profile'} />} />
                        <Route path='/profile/:userId?' render={() => <ProfilePage />} />
                        <Route path='/dialogs' render={() => <DialogsPage />} />
                        <Route path='/news' render={() => <News />} />
                        <Route path='/music' render={() => <Music />} />
                        <Route path='/settings' render={() => <Settings />} />
                        <Route path='/users' render={() => <UsersPage pageTitle={'Users'} />} />
                        <Route path='/login' render={() => <Login />} />
                    </Suspense>
                </Content>
            </Layout>
        </Layout>
    )
}

export default App