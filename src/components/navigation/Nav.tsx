import React from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'antd'
import {
    UserOutlined,
    CommentOutlined, TeamOutlined, SettingOutlined, CustomerServiceOutlined, ReadOutlined
} from '@ant-design/icons'
import logo from './../../assets/img/logo.svg'
import s from './Nav.module.css'


export const Nav = () => {
    return (
        <Menu
            theme='dark'
            mode='inline'
            defaultSelectedKeys={['1']}

        >
            <img className={s.logo} src={logo} alt={'logo'} />
            <Menu.Item key='1' icon={<UserOutlined rev={undefined} />}>
                <Link to='/profile'> Profile </Link>
            </Menu.Item>

            <Menu.Item key='2' icon={<CommentOutlined rev={undefined} />}>
                <Link to='/dialogs'> Messages </Link>
            </Menu.Item>

            <Menu.Item key='3' icon={<TeamOutlined rev={undefined} />}>
                <Link to='/users'>Users</Link>
            </Menu.Item>
            <Menu.Item key='4' icon={<CommentOutlined rev={undefined} />}>
                <Link to='/chat'>Chat</Link>
            </Menu.Item>

        </Menu>
    )
}