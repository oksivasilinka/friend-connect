import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { Users } from './Users'
import { Preloader } from 'components/common/preloader'
import { getIsFetching } from 'components/users/usersSelectors'
import { Typography } from 'antd'

type Props = {
    pageTitle: string
}

const { Title } = Typography

export const UsersPage: FC<Props> = ({ pageTitle }) => {
    const isFetching = useSelector(getIsFetching)

    return <>
        <Title level={2}>{pageTitle}</Title>
        {isFetching ? <Preloader /> : null}
        <Users />
    </>
}
