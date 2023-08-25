import React, {Component} from "react";
import {connect} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {DataType, logOut} from "../../redux/authReducer";
import {Header} from "./Header";


type MapStateToPropsType = {
    data: DataType | null;
};

type MapDispatchToPropsType = {
    logOut: () => void
};

type PropsType = MapStateToPropsType & MapDispatchToPropsType;

class HeaderAPIContainer extends Component<PropsType, DataType> {


    render() {
        return <Header {...this.props} data={this.props.data}/>;
    }
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => ({
    data: state.auth
});


export const HeaderContainer = connect(mapStateToProps, {logOut})(HeaderAPIContainer);