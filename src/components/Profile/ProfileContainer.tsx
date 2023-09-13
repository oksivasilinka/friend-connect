import React from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {getProfile, getStatus, ProfileType, savePhoto, updateStatus} from "redux/profileReducer";
import {AppRootStateType} from "redux/store";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {compose} from "redux";
import {WithAuthRedirect} from "hoc/WithAuthRedirect";

type MapStateToPropsType = {
    profile: ProfileType | null
    status: string
    authorizedUserId: string | null
    isAuth: boolean
}
type MapDispatchToPropsType = {
    getProfile: (id: string | null) => void
    getStatus: (id: string | null) => void
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
}
type OwnPropsType = MapStateToPropsType & MapDispatchToPropsType;
type PathParamsType = {
    userId?: string | undefined
}

type ProfileContainerPropsType = RouteComponentProps<PathParamsType> & OwnPropsType


export class ProfileAPIContainer extends React.Component<ProfileContainerPropsType> {

    refreshProfile() {
        let userId: string | null = this.props.match.params.userId as string | null;
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

    componentDidUpdate(prevProps: Readonly<ProfileContainerPropsType>, prevState: Readonly<{}>, snapshot?: any) {
        if (this.props.match.params.userId != prevProps.match.params.userId)
            this.refreshProfile()
    }

    render() {
        return <Profile {...this.props}
                        isOwner={!this.props.match.params.userId}
                        profile={this.props.profile}
                        status={this.props.status}
                        updateStatus={this.props.updateStatus}
                        savePhoto={this.props.savePhoto}/>
    }
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.id,
    isAuth: state.auth.isAuth,
})

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getProfile, getStatus, updateStatus, savePhoto}),
    withRouter,
    WithAuthRedirect,
)(ProfileAPIContainer)