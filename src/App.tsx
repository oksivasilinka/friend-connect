import React from 'react';
import './App.css';
import {Nav} from "./Components/Nav/Nav";
import {Route, withRouter} from "react-router-dom";
import {News} from "./Components/News/News";
import {Music} from "./Components/Music/Music";
import {Settings} from "./Components/Settings/Settings";
import {Sidebar} from "./Components/Sidebar/Sidebar";
import ProfileContainer from "./Components/Profile/ProfileContainer";
import {HeaderContainer} from "./Components/Header/HeaderContainer";
import UsersContainer from "./Components/Users/UsersContainer";
import DialogsContainer from "./Components/Dialogs/DialogsContainer";
import Login from "./Components/login/Login";
import {connect} from "react-redux";
import {compose} from "redux";
import {AppRootStateType} from "./redux/store";
import {Preloader} from "./Components/common/preloader/preloader";
import {initializeApp} from "./redux/appReducer";

type PropsType = {
    initializeApp: ()=> void
    initialized: boolean
}


class App extends React.Component<PropsType> {
    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
                <div className="App">
                    <HeaderContainer/>
                    <Nav/>
                    <div className='App-content'>
                        <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                        <Route path='/dialogs' render={() => <DialogsContainer/>}/>
                        <Route path='/news' render={() => <News/>}/>
                        <Route path='/music' render={() => <Music/>}/>
                        <Route path='/settings' render={() => <Settings/>}/>
                        <Route path='/users' render={() => <UsersContainer/>}/>
                        <Route path='/login' render={() => <Login/>}/>
                    </div>
                    <Sidebar/>
                </div>
        );
    }
}

type MapStateToPropsType = {
    initialized: boolean
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => ({
    initialized: state.app.initialized
})

export default compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp})
)(App)
