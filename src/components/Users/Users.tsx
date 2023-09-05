import React from "react";
import {UsersType} from "../../redux/usersReducer";
import {Pagination} from "../common/pagination/Pagination";
import {User} from "./User";

type UsersPropsType = {
    users: UsersType[]
    pageSize: number
    totalCount: number
    currentPage: number
    onPageChanged: (page: number) => void
    follow: (id: number) => void
    unFollow: (id: number) => void
    followingInProgress: number[]
}

export const Users: React.FC<UsersPropsType> = ({
                                                    users, pageSize, totalCount, currentPage, onPageChanged, follow,
                                                    unFollow, followingInProgress
                                                }) => {
    return (
        <div>
            <Pagination pageSize={pageSize}
                        onPageChanged={onPageChanged}
                        currentPage={currentPage}
                        totalCount={totalCount}/>
            {
                users.map(user => <User key={user.id}
                                     user={user}
                                     follow={follow}
                                     unFollow={unFollow}
                                     followingInProgress={followingInProgress}/>)
            }
        </div>
    )
}