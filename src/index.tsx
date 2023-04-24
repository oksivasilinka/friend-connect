import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

export type MessageType = {
    message: string
    id: number
}
export type MessagesType = {
    messagesData: MessageType[];
    dialogs: DialogsType[];

}
export type PostsType = {
    posts: PostType[]
}

export type DialogsType = {
    name: string
    id: number
}
export let dialogs: DialogsType[] = [
    {id: 1, name: 'Oksana'},
    {id: 2, name: 'Volodya'},
    {id: 3, name: 'Valera'},
    {id: 4, name: 'Masha'},
    {id: 5, name: 'Kate'},
    {id: 6, name: 'Alesya'},
]

export let messagesData: MessageType[] = [
    {id: 1, message: 'Hi'},
    {id: 2, message: 'Hello!'},
    {id: 3, message: 'How are you?'},
    {id: 4, message: 'Nice!'}
]

export type PostType = {
    id?: number
    message: string
    likesCount: number
}

export let posts: PostType[] = [
    {id: 1, message: "it's my first post", likesCount: 10},
    {id: 2, message: "it\'s my second post", likesCount: 20},
    {id: 3, message: "hello, friends", likesCount: 30},
    {id: 4, message: "wow", likesCount: 40}
]

ReactDOM.render(
    <App posts={posts} dialogs={dialogs} messages={messagesData}/>,
  document.getElementById('root')
);

