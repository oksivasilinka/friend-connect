import React, { FC } from 'react'
import { FilterForm, getUsersTC } from 'redux/usersReducer'
import { useDispatch } from 'react-redux'
import { Pagination } from 'antd'

type Props = {
    totalCount: number
    currentPage: number
    filter: FilterForm
}

export const PaginationPage: FC<Props> = ({
                                              totalCount,
                                              currentPage,
                                              filter
                                          }) => {

    const dispatch = useDispatch()

    const onPageChanged = (page: number, pageSize: number) => {
        dispatch(getUsersTC(page, pageSize, filter))
    }

    return (
        <Pagination defaultCurrent={1} total={totalCount}
                    onChange={(page, pageSize) => onPageChanged(page, pageSize)}
                    current={currentPage}
                    pageSizeOptions={[10, 20, 50]} />
    )
}