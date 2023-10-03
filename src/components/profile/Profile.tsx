import React, { FC } from 'react'
import { ProfileInfo } from './profileInfo'
import { MyPosts } from 'components/profile/myPosts/MyPosts'

type PropsType = {
    isOwner: boolean
}

export const Profile: FC<PropsType> = ({ isOwner }) => {
    return (
        <div>
            <ProfileInfo isOwner={isOwner} />
            <MyPosts />
        </div>
    )
}