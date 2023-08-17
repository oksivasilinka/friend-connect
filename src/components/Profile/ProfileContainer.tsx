import React from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {getProfile, ProfileType} from "../../redux/profileReducer";
import {AppRootStateType} from "../../redux/store";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";

type MapStateToPropsType = {
    profile: ProfileType | null
}
type MapDispatchToPropsType = {
    getProfile: (id: string) => void
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
    }

    render() {
        return <Profile {...this.props} profile={this.props.profile}/>
    }
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile,
})

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getProfile}),
    withRouter,
    WithAuthRedirect,
)(ProfileAPIContainer)