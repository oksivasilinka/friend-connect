import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import s from './Nav.module.css'

import {
    ContainerOutlined,
    MailOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined
} from '@ant-design/icons'

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group'
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type
    } as MenuItem
}


export const Nav = () => {


    const [collapsed, setCollapsed] = useState(false)

    const toggleCollapsed = () => {
        setCollapsed(!collapsed)
    }
    const items: MenuItem[] = [

        getItem(<Link to='/profile'> Profile </Link>, '1', <PieChartOutlined />),
        getItem(<Link to='/users'>Users</Link>, '3', <ContainerOutlined />),
        getItem(<Link to='/chat'>Chat</Link>, 'sub1', <MailOutlined />),
        getItem(<button className={s.buttonMenu} onClick={toggleCollapsed}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </button>, 'button01')

    ]
    return (
        <>
            <Menu
                defaultSelectedKeys={['3']}
                defaultOpenKeys={['sub1']}
                className={s.menu}
                inlineCollapsed={collapsed}
                items={items}
                mode={'inline'}
            />
        </>
    )
}
