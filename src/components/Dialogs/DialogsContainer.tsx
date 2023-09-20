import React from "react";
import {addNewMessageAC, DialogsType, MessagesType} from "redux/dialogsReducer";
import {Dialogs} from "./Dialogs";
import {AppRootStateType} from "redux/store";
import {connect} from "react-redux";
import {compose, Dispatch} from "redux";
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

let mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        addNewMessage: (text: string) => {
            dispatch(addNewMessageAC(text))
        }
    }
}

export default compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType, null, AppRootStateType>(mapStateToProps, mapDispatchToProps),
    WithAuthRedirect
)(Dialogs)
