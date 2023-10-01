import React, { useState } from 'react'
import s from './Pagination.module.css'

type UsersPropsType = {
    pageSize: number
    totalCount: number
    currentPage: number
    onPageChanged: (page: number) => void
    portionSize?: number
}

export const Pagination: React.FC<UsersPropsType> = ({
                                                         pageSize,
                                                         totalCount,
                                                         currentPage,
                                                         onPageChanged,
                                                         portionSize = 10
                                                     }) => {
    const pagesCount: number = Math.ceil(totalCount / pageSize)
    const pages: number[] = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    const portionCount = Math.ceil(pagesCount / portionSize)
    const [portionNumber, setPortionNumber] = useState(1)
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    const rightPortionPageNumber = portionNumber * portionSize

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