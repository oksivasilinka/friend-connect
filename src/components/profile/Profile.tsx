import React from "react";
import {ProfileFormData, ProfileInfo} from "./profileInfo";
import {MyPostsContainer} from "./myPosts/MyPosts.container";
import {ProfileResponseType} from "api/profileApi";

type PropsType = {
    profile: ProfileResponseType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (formData: ProfileFormData) => void
}

export const Profile: React.FC<PropsType> = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {
    return (
        <div>
            <ProfileInfo
                profile={profile}
                status={status}
                updateStatus={updateStatus}
                isOwner={isOwner}
                savePhoto={savePhoto}
                saveProfile={saveProfile}
            />
            <MyPostsContainer/>
        </div>
    )
}