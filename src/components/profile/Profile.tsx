import React from 'react'
import { ProfileInfo } from './profileInfo'

type Props = {
    isOwner: boolean
}

export const Profile = ({ isOwner }: Props) => {
    return (
        <div>
            <ProfileInfo isOwner={isOwner} />
        </div>
    )
}

