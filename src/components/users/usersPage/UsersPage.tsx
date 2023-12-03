import React from 'react'
import { Users } from 'components/users/usersPage/users/Users'
import { Typography } from 'antd'

type Props = {
    pageTitle: string
}

const { Title } = Typography

export const UsersPage = ({ pageTitle }: Props) => {

    return <>
        <Title level={2}>{pageTitle}</Title>
        <Users />
    </>
}
