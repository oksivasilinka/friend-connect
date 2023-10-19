import React, {useEffect} from 'react'
import {Profile} from './Profile'
import {useSelector} from 'react-redux'
import {getProfile, getStatus} from 'redux/profileReducer'
import {useNavigate, useParams} from 'react-router-dom'
import {authorizedUserIdSelector} from 'components/profile/profileSelector'
import {useAppDispatch} from "redux/store";

type PathParams = {
    userId?: string | undefined
}

const ProfilePage = () => {

    const authorizedUserId = useSelector(authorizedUserIdSelector)
    const navigate = useNavigate()
    const { userId } = useParams<PathParams>()
    const dispatch = useAppDispatch()

    const refreshProfile = () => {
        let profileUserId: number | null = Number(userId)
        if (!profileUserId) {
            profileUserId = authorizedUserId
            if (!profileUserId) {
                navigate('/login')
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

export default ProfilePage
