import React from "react";
import s from './Pagination.module.css'

type UsersPropsType = {
    pageSize: number
    totalCount: number
    currentPage: number
    onPageChanged: (page: number) => void
}

export const Pagination: React.FC<UsersPropsType> = ({pageSize, totalCount, currentPage, onPageChanged}) => {
    let pagesCount: number = Math.ceil(totalCount / pageSize)
    let pages: number[] = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    return (
        <div>
            {pages.map((page, index) => {
                return (
                    <span key={index}
                          className={currentPage === page ? s.selectedPage : ''}
                          onClick={() => onPageChanged(page)}>
                        {page}
                    </span>
                )
            })}
        </div>
    )
}