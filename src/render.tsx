import ReactDOM from "react-dom";
import App from "./App";
import React from "react";
import {RootStateType} from "./redux/state";


export const rerenderEntireTree = (state: RootStateType) => {
    ReactDOM.render(
        <App profilePage={state.profilePage}
             dialogsPage={state.dialogsPage}
             sidebar={state.sidebar}

        />,
        document.getElementById('root')
    );
}
