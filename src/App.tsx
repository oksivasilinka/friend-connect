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
import {StoreType} from "./redux/state";

type PropsType = {
    store: StoreType
}

const App = (props: PropsType) => {
    const state = props.store.getState()

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
                                   dispatch={props.store.dispatch.bind(props.store)}
                                   newPostText={state.profilePage.newPostText}
                               />}/>
                    <Route path='/dialogs'
                           render={() =>
                               <Dialogs dialogs={state.dialogsPage.dialogs} messages={state.dialogsPage.messages}/>}/>
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
