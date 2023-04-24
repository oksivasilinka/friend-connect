import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import {BrowserRouter, Route} from "react-router-dom";
import {Dialogs} from "./components/Dialogs/Dialogs";
import {dialogs, messagesData, posts} from "./index";


function App(props: any) {
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Route path='/profile' render={()=> <Profile posts={posts}/>}/>
                    <Route path='/dialogs' render={()=> <Dialogs messagesData={messagesData} dialogs={dialogs}/>}/>
                    {/*<Route path='/news' render={()=> <News/>}/>*/}
                    {/*<Route path='/musics' render={()=> <Musics/>}/>*/}
                    {/*<Route path='/settings' render={()=> <Settings/>}/>*/}
                </div>
            </div>
        </BrowserRouter>

    );
}


export default App;
