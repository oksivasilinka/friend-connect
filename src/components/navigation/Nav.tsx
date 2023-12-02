import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import type { MenuProps } from 'antd'
import { Button, Menu } from 'antd'

import {
    ContainerOutlined,
    DesktopOutlined,
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

const items: MenuItem[] = [
    getItem(<Link to='/profile'> Profile </Link>, '1', <PieChartOutlined />),
    getItem(<Link to='/dialogs'> Messages </Link>, '2', <DesktopOutlined />),
    getItem(<Link to='/users'>Users</Link>, '3', <ContainerOutlined />),
    getItem(<Link to='/chat'>Chat</Link>, 'sub1', <MailOutlined />)
]

export const Nav = () => {
    const [collapsed, setCollapsed] = useState(false)

    const toggleCollapsed = () => {
        setCollapsed(!collapsed)
    }

    return (
        <>
            <Menu
                defaultSelectedKeys={['3']}
                defaultOpenKeys={['sub1']}
                theme='dark' style={{ height: '100vh' }}
                inlineCollapsed={collapsed}
                items={items}
            />

            <Button type='primary' onClick={toggleCollapsed} style={{ marginBottom: 16, zIndex: 99 }}>
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>

        </>
    )
}
