import React, { FC, useEffect } from 'react'
import { Pagination } from '../common/pagination/Pagination'
import { User } from './User'
import { getUsersTC } from 'redux/usersReducer'
import { useDispatch, useSelector } from 'react-redux'
import {
    getCurrentPage,
    getPageSize,
    getTotalUsersCount, getUsersFilter,
    getUsersSelector
} from 'components/users/usersSelectors'
import { UsersSearchForm } from 'components/users/UsersSearchForm'


export const Users: FC = ({}) => {

    const users = useSelector(getUsersSelector)
    const totalCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsersTC(currentPage, pageSize, filter))
    }, [])


    return (
        <div>
            <UsersSearchForm pageSize={pageSize} />
            <Pagination pageSize={pageSize}
                        currentPage={currentPage}
                        totalCount={totalCount}
                        filter={filter}
            />

            {users.map(user => <User key={user.id} user={user} />)}
        </div>
    )
}

