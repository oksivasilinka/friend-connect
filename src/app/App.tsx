import { useEffect } from 'react'
import { Nav } from 'components/navigation'
import { useSelector } from 'react-redux'
import { AppRootStateType, useAppDispatch } from 'redux/store'
import { Preloader } from 'components/common/preloader'
import { initializeApp } from 'redux/appReducer'
import { AppHeader } from 'components/header/Header'
import { RoutesPages } from 'app/Routes/Routes'
import s from './App.module.css'


const App = () => {

    const initialized = useSelector((state: AppRootStateType) => state.app.initialized)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(initializeApp())
    })

    if (!initialized) {
        return <Preloader />
    }

    return (
        <div className={s.container}>

            <nav className={s.menu}>
                <Nav />
            </nav>
            <AppHeader />
            <div className={s.content}>
                <RoutesPages />
            </div>

        </div>
    )
}

export default App