import React, {Component} from "react";
import {connect} from "react-redux";
import axios from "axios";
import {AppRootStateType} from "../../redux/store";
import {DataType, setUserData} from "../../redux/authReducer";
import {Header} from "./Header";


type MapStateToPropsType = {
    data: DataType | null;
};

type MapDispatchToPropsType = {
    setUserData: (data: DataType) => void;
};

type PropsType = MapStateToPropsType & MapDispatchToPropsType;

class HeaderAPIContainer extends Component<PropsType, DataType> {
    componentDidMount() {
        axios
            .get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {withCredentials: true})
            .then((res) => {
                if (res.data.resultCode === 0) {
                    this.props.setUserData(res.data.data);
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