import React, { FC, useEffect } from 'react'
import { PaginationPage } from 'components/common/pagination/PaginationPage'
import { User } from './User'
import { getUsersTC } from 'redux/usersReducer'
import { useDispatch, useSelector } from 'react-redux'
import {
    currentPageSelector,
    pageSizeSelector,
    totalUsersCount, usersFilterSelector,
    usersSelector
} from 'components/users/usersSelectors'
import { UsersSearchForm } from 'components/users/UsersSearchForm'
import { useHistory, useLocation } from 'react-router-dom'

export const Users: FC = ({}) => {

    const users = useSelector(usersSelector)
    const totalCount = useSelector(totalUsersCount)
    const currentPage = useSelector(currentPageSelector)
    const pageSize = useSelector(pageSizeSelector)
    const filter = useSelector(usersFilterSelector)
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search)
        const page = searchParams.get('page')
        const term = searchParams.get('term')
        const friend = searchParams.get('friend')

        let actualPage = currentPage
        if (page) actualPage = Number(page)

        let actualFilter = filter
        if (term) {
            actualFilter = { ...actualFilter, term: term }
        }
        if (friend) {
            actualFilter = { ...actualFilter, friend: friend === 'null' ? null : friend === 'true' }
        }
        dispatch(getUsersTC(actualPage, pageSize, actualFilter))
    }, [])

    useEffect(() => {
        history.push({
            pathname: '/users',
            search: `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`
        })
    }, [filter, currentPage])


    return (
        <div>
            <UsersSearchForm pageSize={pageSize} />
            <PaginationPage currentPage={currentPage}
                            totalCount={totalCount}
                            filter={filter}
            />
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                {users.map(user => <User key={user.id} user={user} />)}
            </div>

        </div>
    )
}

