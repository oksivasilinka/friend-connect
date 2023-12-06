import { useEffect } from 'react'
import { Profile } from 'pages/profilePage/profile'
import { useSelector } from 'react-redux'
import { getProfile, getStatus } from 'redux/profileReducer'
import { useParams } from 'react-router-dom'
import { authorizedUserIdSelector } from 'pages/profilePage'
import { useAppDispatch } from 'redux/store'
import { Typography } from 'components/common'

type PathParams = {
    userId?: string | undefined
}

const ProfilePage = () => {

    const authorizedUserId = useSelector(authorizedUserIdSelector)
    const { userId } = useParams<PathParams>()
    const dispatch = useAppDispatch()

    const refreshProfile = async () => {
        let id = userId ? Number(userId) : authorizedUserId
        if (id) {
            await dispatch(getProfile(id))
            await dispatch(getStatus(id))
        }
    }

    useEffect(() => {
        refreshProfile()
    }, [userId])

    return (
        <section>
            <Typography variant={'h2'} as={'h2'}>Profile</Typography>
            <Profile isOwner={!userId} />
        </section>
    )
}

export default ProfilePage
