import React, { useEffect } from 'react'
import { Profile } from './Profile'
import { useSelector } from 'react-redux'
import { getProfile, getStatus } from 'redux/profileReducer'
import { useParams } from 'react-router-dom'
import { authorizedUserIdSelector } from 'components/profile/profileSelector'
import { useAppDispatch } from 'redux/store'

type PathParams = {
    userId?: string | undefined
}

const ProfilePage = () => {

    const authorizedUserId = useSelector(authorizedUserIdSelector)
    const { userId } = useParams<PathParams>()
    const dispatch = useAppDispatch()

    const refreshProfile = () => {
        let id = userId ? Number(userId) : authorizedUserId
        if (id) {
            dispatch(getProfile(id))
            dispatch(getStatus(id))
        }
    }

    useEffect(() => {
        refreshProfile()
    }, [userId])

    return (
        <Profile isOwner={!userId} />
    )
}

export default ProfilePage
