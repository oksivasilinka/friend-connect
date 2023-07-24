import React from "react";
import {StoreType} from "../../redux/store";
import {addNewMessageAC, ChangeNewMessageAC} from "../../redux/dialogsReducer";
import {Dialogs} from "./Dialogs";

type DialogsPropsType = {
    store: StoreType
}

export const DialogsContainer = (props: DialogsPropsType) => {
    let state = props.store.getState().dialogsPage


    const addMessage = (text: string) => {
        props.store.dispatch(addNewMessageAC(text))
    }
    const onNewMessageChange = (body: string) => {
        props.store.dispatch(ChangeNewMessageAC(body))
    }

    return (
        <Dialogs dialogs={state.dialogs} messages={state.messages} updateNewMessageBody={onNewMessageChange}
                 addNewMessage={addMessage} dialogsPage={state}/>
    )
}