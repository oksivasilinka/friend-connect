import React from 'react'
import { ProfileInfo } from './profileInfo'
import { MyPosts } from 'components/profile/myPosts/MyPosts'

type Props = {
    isOwner: boolean
}

export const Profile = ({ isOwner }: Props) => {
    return (
        <div>
            <ProfileInfo isOwner={isOwner} />
            <MyPosts />
        </div>
    )
}