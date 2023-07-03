import React from 'react';
import './index.css';
import ReactDOM from "react-dom";
import App from "./App";
import {RootStateType, store} from "./redux/state";


// rerenderEntireTree(state)

let rerenderEntireTree = () => {
    ReactDOM.render(
        <App store={store}/>,
        document.getElementById('root')
    );
}
rerenderEntireTree()

store.subscribe(rerenderEntireTree)
