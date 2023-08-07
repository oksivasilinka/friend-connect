import React from "react";
import {Profile} from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {ProfileType, setUserProfile} from "../../redux/profileReducer";
import {AppRootStateType} from "../../redux/redux-store";


export class ProfileAPIContainer extends React.Component<PropsType, ProfileType> {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
            .then(res => {
                this.props.setUserProfile(res.data)
            })
    }
    render() {
        return (
            <div>
                <Profile {...this.props}  profile={this.props.profile}/>
            </div>
        )
    }
}

type MapDispatchToPropsType = {
    setUserProfile: (profile: ProfileType | null) => void;
};
type PropsType = MapStateToPropsType & MapDispatchToPropsType;

type MapStateToPropsType = {
    profile: ProfileType | null
}

let mapStateToProps = (state: AppRootStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile
})

export const ProfileContainer = connect(mapStateToProps, {setUserProfile})(ProfileAPIContainer)