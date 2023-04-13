import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import {BrowserRouter, Route, RouteComponentProps, RouteProps} from "react-router-dom";
import {Dialogs} from "./components/Dialogs/Dialogs";
import News from "./components/News/News";
import Musics from "./components/Musics/Musics";
import Settings from "./components/Settings/Settings";
import {MessagesType, MessageType} from "./components/Dialogs/Message/Message";
import {DialogsType} from "./components/Dialogs/DialogItem/DialogItem";
import {dialogs, messagesData, posts} from "./index";


function App() {
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Route path='/profile' render={()=> <Profile posts={posts}/>}/>
                    <Route path='/dialogs' render={()=> <Dialogs messagesData={messagesData} dialogs={dialogs}/>}/>
                    <Route path='/news' render={()=> <News/>}/>
                    <Route path='/musics' render={()=> <Musics/>}/>
                    <Route path='/settings' render={()=> <Settings/>}/>
                </div>
            </div>
        </BrowserRouter>

    );
}


export default App;
