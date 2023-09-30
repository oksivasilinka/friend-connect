import React from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {getProfile, getStatus, savePhoto, saveProfile, updateStatus} from "redux/profileReducer";
import {AppRootStateType} from "redux/store";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {compose} from "redux";
import {WithAuthRedirect} from "hoc/WithAuthRedirect";
import {ProfileFormData,} from "components/profile/profileInfo/ProfileInfo";
import {ProfileResponseType} from "api/profileApi";

type MapStateToPropsType = {
    profile: ProfileResponseType | null
    status: string
    authorizedUserId: number | null
    isAuth: boolean
}
type MapDispatchToPropsType = {
    getProfile: (id: number | null) => void
    getStatus: (id: number | null) => void
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (formData: ProfileFormData) => void
}
type OwnPropsType = MapStateToPropsType & MapDispatchToPropsType;
type PathParamsType = {
    userId?: string | undefined
}

type ProfileContainerPropsType = RouteComponentProps<PathParamsType> & OwnPropsType


export class ProfileAPIContainer extends React.Component<ProfileContainerPropsType> {

    refreshProfile() {
        let userId: number | null = Number(this.props.match.params.userId)
        if (!userId) {
            userId = this.props.authorizedUserId
            if (!userId) {
                this.props.history.push('/login')
            }
        }
        this.props.getProfile(userId)
        this.props.getStatus(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: Readonly<ProfileContainerPropsType>) {
        if (this.props.match.params.userId != prevProps.match.params.userId)
            this.refreshProfile()
    }

    render() {
        return <Profile {...this.props}
                        isOwner={!this.props.match.params.userId}
                        profile={this.props.profile}
                        status={this.props.status}
                        updateStatus={this.props.updateStatus}
                        savePhoto={this.props.savePhoto}
                        saveProfile={this.props.saveProfile}/>
    }
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.id,
    isAuth: state.auth.isAuth,
})

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    withRouter,
    WithAuthRedirect,
)(ProfileAPIContainer)