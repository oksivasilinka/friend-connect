import { Navigate, Route, Routes } from 'react-router-dom'
import { News } from 'components/news/News'
import { Music } from 'components/music/Music'
import { Settings } from 'components/settings/Settings'
import { UsersPage } from 'components/users/UsersPage'
import { Login } from 'components/login/Login'
import React from 'react'
import ProfilePage from 'components/profile/ProfilePage'
import DialogsPage from 'components/dialogs/DialogsPage'
import ChatPage from 'components/ChatPage/ChatPage'


export const RoutesPages = () => {
    return (
        < Routes>
            <Route path='/' element={<Navigate to={'/profile'} />} />
            <Route path='/profile/:userId?' element={<ProfilePage />} />
            <Route path='/dialogs' element={<DialogsPage />} />
            <Route path='/news' element={<News />} />
            <Route path='/music' element={<Music />} />
            <Route path='/settings' element={<Settings />} />
            <Route path='/users' element={<UsersPage pageTitle={'Users'} />} />
            <Route path='/login' element={<Login />} />
            <Route path='/chat' element={<ChatPage />} />
        </Routes>
    )
}