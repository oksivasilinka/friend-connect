import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
    <App />,
  document.getElementById('root')
);

export let dialogs = [
    {id: 1, name: 'Oksana'},
    {id: 2, name: 'Volodya'},
    {id: 3, name: 'Valera'},
    {id: 4, name: 'Masha'},
    {id: 5, name: 'Kate'},
    {id: 6, name: 'Alesya'},
]

export let messagesData = [
    {id: 1, message: 'Hi'},
    {id: 2, message: 'Hello!'},
    {id: 3, message: 'How are you?'},
    {id: 4, message: 'Nice!'}
]