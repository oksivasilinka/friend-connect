import React from 'react';
import './index.css';
import {RootStateType, state, subscriber} from "./redux/state";
import ReactDOM from "react-dom";
import App from "./App";


// rerenderEntireTree(state)

let rerenderEntireTree = () => {
    ReactDOM.render(
        <App profilePage={state.profilePage}
             dialogsPage={state.dialogsPage}
             sidebar={state.sidebar}

        />,
        document.getElementById('root')
    );
}
rerenderEntireTree()

subscriber(rerenderEntireTree)
