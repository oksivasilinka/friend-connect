import React from 'react'
import './index.css'
import App from 'app/App'
import { BrowserRouter } from 'react-router-dom'
import { store } from 'redux/store'
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'


const root = createRoot(document.getElementById('root') as HTMLElement)

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)

