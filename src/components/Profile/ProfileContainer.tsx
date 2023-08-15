import React from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {getProfile, ProfileType} from "../../redux/profileReducer";
import {AppRootStateType} from "../../redux/store";
import {RouteComponentProps, withRouter} from "react-router-dom";

type MapStateToPropsType = {
    profile: ProfileType | null
    isAuth: boolean
}
type MapDispatchToPropsType = {
    getProfile: (id: string) => void
}
type OnePropsType = MapStateToPropsType & MapDispatchToPropsType;
type PathParamsType = {
    userId: string
}

type PropsType = RouteComponentProps<PathParamsType> & OnePropsType

export class ProfileAPIContainer extends React.Component<PropsType, ProfileType> {
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
    isAuth: state.auth.isAuth
})

const WithUrlDataContainerComponent = withRouter(ProfileAPIContainer)

export const ProfileContainer = connect(mapStateToProps, {getProfile})(WithUrlDataContainerComponent)