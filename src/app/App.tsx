import React, { useEffect } from 'react'
import { Nav } from 'components/navigation/Nav'
import { useSelector } from 'react-redux'
import { AppRootStateType, useAppDispatch } from 'redux/store'
import { Preloader } from 'components/common/preloader'
import { initializeApp } from 'redux/appReducer'
import { Layout } from 'antd'
import { AppHeader } from 'components/header/Header'
import { RoutesPages } from 'app/Routes/Routes'
import s from './App.module.css'

const { Content } = Layout

const App = () => {

    const initialized = useSelector((state: AppRootStateType) => state.app.initialized)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(initializeApp())
    })

    if (!initialized) {
        return <Preloader />
    }

    return (
        <div className={s.container}>

            <div className={s.menu}>
                <Nav />
            </div>


            <>
                <AppHeader />
                <Content className={s.content}>

                    <RoutesPages />
                </Content>
            </>

        </div>
    )
}

export default App