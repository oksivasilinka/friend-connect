import React, { FC, useState } from 'react'
import s from './Pagination.module.css'
import { FilterForm, getUsersTC } from 'redux/usersReducer'
import { useDispatch } from 'react-redux'

type Props = {
    pageSize: number
    totalCount: number
    currentPage: number
    portionSize?: number
    filter: FilterForm
}

export const Pagination: FC<Props> = ({
                                          pageSize,
                                          totalCount,
                                          currentPage,
                                          portionSize = 10,
                                          filter
                                      }) => {

    const dispatch = useDispatch()

    const pagesCount: number = Math.ceil(totalCount / pageSize)
    const pages: number[] = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    const portionCount = Math.ceil(pagesCount / portionSize)
    const [portionNumber, setPortionNumber] = useState(1)
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    const rightPortionPageNumber = portionNumber * portionSize

    const onPageChanged = (page: number) => {
        dispatch(getUsersTC(page, pageSize, filter))
    }

    return (
        <div className={s.paginationBlock}>
            {portionNumber > 1 && <button className={s.buttonLeft} onClick={() => {
                setPortionNumber(portionNumber - 1)
            }}>Prev</button>}
            <div className={s.pagesBlock}>
                {pages
                    .filter(page => page >= leftPortionPageNumber && page <= rightPortionPageNumber)
                    .map((page, index) => {
                        return (
                            <span key={index}
                                  className={currentPage === page ? s.selectedPage : s.page}
                                  onClick={() => onPageChanged(page)}>
                        {` ${page} `}
                    </span>
                        )
                    })}
            </div>
            {portionCount > portionNumber && <button className={s.buttonRight} onClick={() => {
                setPortionNumber(portionNumber + 1)
            }}>Next</button>}

        </div>
    )
}