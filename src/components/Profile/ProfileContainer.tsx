import React from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {ProfileType, setUserProfile} from "../../redux/profileReducer";
import {AppRootStateType} from "../../redux/store";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {userProfileAPI} from "../../api/api";

type MapStateToPropsType = {
    profile: ProfileType | null
}
type MapDispatchToPropsType = {
    setUserProfile: (profile: ProfileType | null) => void;
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
        userProfileAPI.getUserProfile(userId).then(data => {
            this.props.setUserProfile(data)
        })
    }

    render() {
        return (
            <div>
                <Profile {...this.props} profile={this.props.profile}/>
            </div>
        )
    }
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile
})

const WithUrlDataContainerComponent = withRouter(ProfileAPIContainer)

export const ProfileContainer = connect(mapStateToProps, {setUserProfile})(WithUrlDataContainerComponent)