import { Navigate, Route, Routes } from 'react-router-dom'
import { UsersPage } from 'components/users/usersPage/UsersPage'
import { Login } from 'components/login/Login'
import React from 'react'
import ProfilePage from 'components/profile/ProfilePage'
import ChatPage from 'components/ChatPage/ChatPage'


export const RoutesPages = () => {
    return (
        <Routes>
            <Route path='/' element={<Navigate to={'/profile'} />} />
            <Route path='/profile/:userId?' element={<ProfilePage />} />
            <Route path='/users' element={<UsersPage pageTitle={'Users'} />} />
            <Route path='/login' element={<Login />} />
            <Route path='/chat' element={<ChatPage />} />
        </Routes>
    )
}