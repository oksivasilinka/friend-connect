import React, { FC, useEffect } from 'react'
import { Profile } from './Profile'
import { useDispatch, useSelector } from 'react-redux'
import { getProfile, getStatus } from 'redux/profileReducer'
import { useHistory, useParams } from 'react-router-dom'
import { authorizedUserIdSelector } from 'components/profile/profileSelector'

type PathParams = {
    userId?: string | undefined
}

export const ProfilePage: FC = () => {

    const authorizedUserId = useSelector(authorizedUserIdSelector)
    const history = useHistory()
    const { userId } = useParams<PathParams>()
    const dispatch = useDispatch()

    const refreshProfile = () => {
        let profileUserId: number | null = Number(userId)
        if (!profileUserId) {
            profileUserId = authorizedUserId
            if (!profileUserId) {
                history.push('/login')
            }
        }
        dispatch(getProfile(profileUserId as number))
        dispatch(getStatus(profileUserId as number))
    }

    useEffect(() => {
        refreshProfile()
    }, [userId])

    return (
        <Profile isOwner={!userId} />
    )
}
