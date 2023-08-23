import React, {Component} from "react";
import {connect} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {DataType, getAuthMe, logOut} from "../../redux/authReducer";
import {Header} from "./Header";


type MapStateToPropsType = {
    data: DataType | null;
};

type MapDispatchToPropsType = {
    getAuthMe: () => void
    logOut: () => void
};

type PropsType = MapStateToPropsType & MapDispatchToPropsType;

class HeaderAPIContainer extends Component<PropsType, DataType> {
    componentDidMount() {
        this.props.getAuthMe()
    }

    render() {
        return <Header {...this.props} data={this.props.data}/>;
    }
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => ({
    data: state.auth
});


export const HeaderContainer = connect(mapStateToProps, {getAuthMe, logOut})(HeaderAPIContainer);