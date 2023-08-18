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
}
type MapDispatchToPropsType = {
    getProfile: (id: string) => void
    getStatus: (id: string) => void
    updateStatus: (status: string) => void
}
type OwnPropsType = MapStateToPropsType & MapDispatchToPropsType;
type PathParamsType = {
    userId: string
}

type ProfileContainerPropsType = RouteComponentProps<PathParamsType> & OwnPropsType

export class ProfileAPIContainer extends React.Component<ProfileContainerPropsType> {
    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = '2'
        }
        this.props.getProfile(userId)
        this.props.getStatus(userId)
    }

    render() {
        return <Profile {...this.props} profile={this.props.profile} status={this.props.status}
                        updateStatus={this.props.updateStatus}/>
    }
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
})

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getProfile, getStatus, updateStatus}),
    withRouter,
    WithAuthRedirect,
)(ProfileAPIContainer)