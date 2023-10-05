import React from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'antd'
import {
    UserOutlined,
    CommentOutlined, TeamOutlined, SettingOutlined, CustomerServiceOutlined, ReadOutlined
} from '@ant-design/icons'


export const Nav = () => {
    return (
        <Menu
            theme='dark'
            mode='inline'
            defaultSelectedKeys={['1']}

        >
            <Menu.Item key='1' icon={<UserOutlined rev={undefined} />}>
                <Link to='/profile'> Profile </Link>
            </Menu.Item>

            <Menu.Item key='2' icon={<CommentOutlined  rev={undefined} />}>
                <Link to='/dialogs'> Messages </Link>
            </Menu.Item>

            <Menu.Item key='3' icon={<ReadOutlined rev={undefined} />}>
                <Link to='/news'> News </Link>
            </Menu.Item>

            <Menu.Item key='4' icon={<CustomerServiceOutlined rev={undefined} />}>
                <Link to='/music'> Music</Link>
            </Menu.Item>

            <Menu.Item key='5' icon={<SettingOutlined rev={undefined}/>}>
                <Link to='/settings'>Settings</Link>
            </Menu.Item>

            <Menu.Item key='6' icon={<TeamOutlined rev={undefined} />}>
                <Link to='/users'>Users</Link>
            </Menu.Item>

        </Menu>
    )
}