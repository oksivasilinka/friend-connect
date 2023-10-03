import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { Users } from './Users'
import { Preloader } from 'components/common/preloader'
import { getIsFetching } from 'components/users/usersSelectors'

type Props = {
    pageTitle: string
}

export const UsersPage: FC<Props> = ({ pageTitle }) => {
    const isFetching = useSelector(getIsFetching)

    return <>
        <h2>{pageTitle}</h2>
        {isFetching ? <Preloader /> : null}
        <Users />
    </>
}
