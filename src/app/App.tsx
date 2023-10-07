import React, { useEffect, useState } from 'react'
import { Nav } from 'components/navigation/Nav'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootStateType } from 'redux/store'
import { Preloader } from 'components/common/preloader'
import { initializeApp } from 'redux/appReducer'
import { Layout } from 'antd'
import { AppHeader } from 'components/header/Header'
import { Routes } from 'app/Routes/Routes'
import s from './App.module.css'

const { Sider, Content } = Layout

const App = () => {

    const [collapsed, setCollapsed] = useState(false)
    const initialized = useSelector((state: AppRootStateType) => state.app.initialized)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeApp())
    })

    if (!initialized) {
        return <Preloader />
    }

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <Nav />
            </Sider>

            <Layout>
                <AppHeader collapsed={collapsed} setCollapsed={setCollapsed} />
                <Content className={s.content}>
                    <Routes />
                </Content>
            </Layout>
        </Layout>
    )
}

export default App