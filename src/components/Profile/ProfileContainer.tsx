import React from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {getProfile, getStatus, ProfileType, updateStatus} from "../../redux/profileReducer";
import {AppRootStateType} from "../../redux/store";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";

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
}
type OwnPropsType = MapStateToPropsType & MapDispatchToPropsType;
type PathParamsType = {
    userId?: string | undefined
}

type ProfileContainerPropsType = RouteComponentProps<PathParamsType> & OwnPropsType

export class ProfileAPIContainer extends React.Component<ProfileContainerPropsType> {
    componentDidMount() {
        const {match, authorizedUserId, history, getProfile, getStatus} = this.props
        let userId: string | null = match.params.userId as string | null;
        if (!userId) {
            userId = authorizedUserId
            if (!userId) {
                history.push('/login')
            }
        }
        getProfile(userId)
        getStatus(userId)
    }

    render() {
        return <Profile {...this.props} profile={this.props.profile} status={this.props.status}
                        updateStatus={this.props.updateStatus}/>
    }
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.id,
    isAuth: state.auth.isAuth
})

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getProfile, getStatus, updateStatus}),
    withRouter,
    WithAuthRedirect,
)(ProfileAPIContainer)