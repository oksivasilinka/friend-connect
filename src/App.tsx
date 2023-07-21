import React from 'react';
import './App.css';
import {Header} from "./Components/Header/Header";
import {Nav} from "./Components/Nav/Nav";
import {Profile} from "./Components/Profile/Profile";
import {Dialogs} from "./Components/Dialogs/Dialogs";
import {BrowserRouter, Route} from "react-router-dom";
import {News} from "./Components/News/News";
import {Music} from "./Components/Music/Music";
import {Settings} from "./Components/Settings/Settings";
import {Sidebar} from "./Components/Sidebar/Sidebar";
import {ActionTypes, RootStateType, StoreType} from "./redux/store";
import {store} from "./redux/store";


type PropsType = {
    state: RootStateType
    dispatch: (action: ActionTypes) => void
    store: StoreType
}

const App = (props: PropsType) => {
    const state = store.getState()

    return (
        <BrowserRouter>
            <div className="App">
                <Header/>
                <Nav/>
                <div className='App-content'>
                    <Route path='/profile'
                           render={() =>
                               <Profile
                                   posts={state.profilePage.posts}
                                   dispatch={props.dispatch.bind(store)}
                                   newPostText={state.profilePage.newPostText}
                               />}/>
                    <Route path='/dialogs'
                           render={() =>
                               <Dialogs
                                   dialogs={state.dialogsPage.dialogs}
                                   messages={state.dialogsPage.messages}
                                   newMessageText={state.dialogsPage.newMessageText}
                                   dispatch={props.dispatch.bind(store)}
                               />}/>
                    <Route path='/news'
                           render={() =>
                               <News/>}/>
                    <Route path='/music'
                           render={() =>
                               <Music/>}/>
                    <Route path='/settings'
                           render={() =>
                               <Settings/>}/>
                </div>
                <Sidebar/>
            </div>
        </BrowserRouter>
    );
}

export default App;
