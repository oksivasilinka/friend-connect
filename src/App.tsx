import React, { FC, Suspense, useEffect } from 'react'
import './App.css'
import { Nav } from 'components/navigation/Nav'
import { Redirect, Route } from 'react-router-dom'
import { News } from 'components/news/News'
import { Music } from 'components/music/Music'
import { Settings } from 'components/settings/Settings'
import { Sidebar } from 'components/sidebar/Sidebar'
import { HeaderContainer } from 'components/header/HeaderContainer'
import { UsersPage } from 'components/users/UsersPage'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootStateType } from 'redux/store'
import { Preloader } from 'components/common/preloader'
import { initializeApp } from 'redux/appReducer'
import { Login } from 'components/login/Login'
import { DialogsPage } from 'components/dialogs/DialogsPage'
import { ProfilePage } from 'components/profile/ProfileContainer'

const App: FC = () => {

    const initialized = useSelector((state: AppRootStateType) => state.app.initialized)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeApp())
    })

    if (!initialized) return <Preloader />

    return (
        <div className='App'>
            <HeaderContainer />
            <Nav />
            <div className='App-content'>
                <Suspense fallback={<Preloader />}>
                    <Route exact path='/' render={() => <Redirect to={'/profile'} />} />
                    <Route path='/profile/:userId?' render={() => <ProfilePage />} />
                    <Route path='/dialogs' render={() => <DialogsPage />} />
                    <Route path='/news' render={() => <News />} />
                    <Route path='/music' render={() => <Music />} />
                    <Route path='/settings' render={() => <Settings />} />
                    <Route path='/users' render={() => <UsersPage pageTitle={'Users'} />} />
                    <Route path='/login' render={() => <Login />} />
                </Suspense>
            </div>
            <Sidebar />
        </div>
    )
}

export default App