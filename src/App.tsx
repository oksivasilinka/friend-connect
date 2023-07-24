import React from 'react';
import './App.css';
import {Header} from "./Components/Header/Header";
import {Nav} from "./Components/Nav/Nav";
import {Profile} from "./Components/Profile/Profile";
import {BrowserRouter, Route} from "react-router-dom";
import {News} from "./Components/News/News";
import {Music} from "./Components/Music/Music";
import {Settings} from "./Components/Settings/Settings";
import {Sidebar} from "./Components/Sidebar/Sidebar";
import {ActionTypes, RootStateType, StoreType} from "./redux/store";
import {DialogsContainer} from "./Components/Dialogs/DialogsContainer";


type PropsType = {
    state: RootStateType
    dispatch: (action: ActionTypes) => void
    store: StoreType
}

const App = (props: PropsType) => {

    return (
        <BrowserRouter>
            <div className="App">
                <Header/>
                <Nav/>
                <div className='App-content'>
                    <Route path='/profile'
                           render={() =>
                               <Profile store={props.store}
                               />}/>
                    <Route path='/dialogs'
                           render={() =>
                               <DialogsContainer store={props.store}/>
                           }/>
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
