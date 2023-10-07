import { Preloader } from 'components/common/preloader'
import { Redirect, Route } from 'react-router-dom'
import { News } from 'components/news/News'
import { Music } from 'components/music/Music'
import { Settings } from 'components/settings/Settings'
import { UsersPage } from 'components/users/UsersPage'
import { Login } from 'components/login/Login'
import React, { Suspense } from 'react'

const DialogsPage = React.lazy(() => import('components/dialogs/DialogsPage'))
const ProfilePage = React.lazy(() => import('components/profile/ProfilePage'))
const ChatPage = React.lazy(() => import('components/ChatPage/ChatPage'))

export const Routes = () => {
    return (
        < Suspense fallback={<Preloader />}>
            <Route exact path='/' render={() => <Redirect to={'/profile'} />} />
            <Route path='/profile/:userId?' render={() => <ProfilePage />} />
            <Route path='/dialogs' render={() => <DialogsPage />} />
            <Route path='/news' render={() => <News />} />
            <Route path='/music' render={() => <Music />} />
            <Route path='/settings' render={() => <Settings />} />
            <Route path='/users' render={() => <UsersPage pageTitle={'Users'} />} />
            <Route path='/login' render={() => <Login />} />
            <Route path='/chat' render={() => <ChatPage />} />
        </Suspense>
    )
}