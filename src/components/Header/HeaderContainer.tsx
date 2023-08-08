import React, {Component} from "react";
import {connect} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {DataType, setUserData} from "../../redux/authReducer";
import {Header} from "./Header";
import {authMeAPI} from "../../api/api";


type MapStateToPropsType = {
    data: DataType | null;
};

type MapDispatchToPropsType = {
    setUserData: (data: DataType) => void;
};

type PropsType = MapStateToPropsType & MapDispatchToPropsType;

class HeaderAPIContainer extends Component<PropsType, DataType> {
    componentDidMount() {
        authMeAPI.getAuthMe().then((data) => {
            if (data.resultCode === 0) {
                this.props.setUserData(data.data);
            }
        });
    }

    render() {
        return <Header {...this.props} data={this.props.data}/>;
    }
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => ({
    data: state.auth
});


export const HeaderContainer = connect(mapStateToProps, {setUserData})(HeaderAPIContainer);