import React from "react";
import {addNewMessageAC, ChangeNewMessageAC} from "../../redux/dialogsReducer";
import {Dialogs} from "./Dialogs";
import {store} from "../../redux/redux-store";

export const DialogsContainer = () => {
    let state = store.getState().dialogsPage

    const addMessage = (text: string) => {
        store.dispatch(addNewMessageAC(text))
    }
    const onNewMessageChange = (body: string) => {
        store.dispatch(ChangeNewMessageAC(body))
    }

    return <Dialogs
        dialogs={state.dialogs}
        messages={state.messages}
        updateNewMessageBody={onNewMessageChange}
        addNewMessage={addMessage}
        dialogsPage={state}/>

}