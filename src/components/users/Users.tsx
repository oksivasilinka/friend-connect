import React from 'react'
import { Pagination } from '../common/pagination/Pagination'
import { User } from './User'
import { UserResponseType } from 'api/usersApi'
import { UsersSearchForm } from 'components/users/UsersContainer'
import { FilterForm } from 'redux/usersReducer'

type UsersPropsType = {
    users: UserResponseType[]
    pageSize: number
    totalCount: number
    currentPage: number
    onPageChanged: (page: number) => void
    onFilterChanged: (filter: FilterForm) => void
    follow: (id: number) => void
    unFollow: (id: number) => void
    followingInProgress: number[]
}

export const Users: React.FC<UsersPropsType> = ({
                                                    users,
                                                    pageSize,
                                                    totalCount,
                                                    currentPage,
                                                    onPageChanged,
                                                    follow,
                                                    unFollow,
                                                    followingInProgress,
                                                    onFilterChanged
                                                }) => {
    return (
        <div>
            <UsersSearchForm onFilterChanged={onFilterChanged} />
            <Pagination pageSize={pageSize}
                        onPageChanged={onPageChanged}
                        currentPage={currentPage}
                        totalCount={totalCount} />
            {
                users.map(user => <User key={user.id}
                                        user={user}
                                        follow={follow}
                                        unFollow={unFollow}
                                        followingInProgress={followingInProgress} />)
            }
        </div>
    )
}

