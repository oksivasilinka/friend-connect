import React, { Suspense } from 'react'
import './App.css'
import { Nav } from 'components/navigation/Nav'
import { Redirect, Route, withRouter } from 'react-router-dom'
import { News } from 'components/news/News'
import { Music } from 'components/music/Music'
import { Settings } from 'components/settings/Settings'
import { Sidebar } from 'components/sidebar/Sidebar'
import { HeaderContainer } from 'components/header/HeaderContainer'
import UsersContainer from './components/users/UsersContainer'
import Login from './components/login/Login'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { AppRootStateType } from 'redux/store'
import { Preloader } from 'components/common/preloader'
import { initializeApp } from 'redux/appReducer'


const DialogsContainer = React.lazy(() => import('./components/dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(() => import('./components/profile/ProfileContainer'))

type PropsType = {
    initializeApp: () => void
    initialized: boolean
}


class App extends React.Component<PropsType> {
    catchAllHandledErrors = () => {
        console.log('some error')
    }

    componentDidMount() {
        this.props.initializeApp()
        window.addEventListener('unhandledrejection', this.catchAllHandledErrors)
    }

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllHandledErrors)
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader />
        }
        return (
            <div className='App'>
                <HeaderContainer />
                <Nav />
                <div className='App-content'>
                    <Suspense fallback={<Preloader />}>
                        <Route exact path='/' render={() => <Redirect to={'/profile'} />} />
                        <Route path='/profile/:userId?' render={() => <ProfileContainer />} />
                        <Route path='/dialogs' render={() => <DialogsContainer />} />
                        <Route path='/news' render={() => <News />} />
                        <Route path='/music' render={() => <Music />} />
                        <Route path='/settings' render={() => <Settings />} />
                        <Route path='/users' render={() => <UsersContainer />} />
                        <Route path='/login' render={() => <Login />} />
                    </Suspense>
                </div>
                <Sidebar />
            </div>
        )
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
    connect(mapStateToProps, { initializeApp })
)(App)

