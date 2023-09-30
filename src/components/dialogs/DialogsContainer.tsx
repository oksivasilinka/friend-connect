import React from "react";
import { dialogsActions, DialogsType, MessagesType } from 'redux/dialogsReducer'
import {Dialogs} from "./Dialogs";
import {AppRootStateType} from "redux/store";
import {connect} from "react-redux";
import {compose} from "redux";
import {WithAuthRedirect} from "hoc/WithAuthRedirect";


export type DialogsPageType = {
    dialogs: DialogsType[],
    messages: MessagesType[],
}

type MapStateToPropsType = {
    dialogsPage: DialogsPageType
}

type MapDispatchToPropsType = {
    addNewMessage: (text: string) => void,
}

let mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
    return {
        dialogsPage: state.dialogsPage,
    }
}


export default compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType, null, AppRootStateType>(mapStateToProps, { ...dialogsActions }),
    WithAuthRedirect
)(Dialogs)
