import s from "./Users.module.css";
import userPhoto from "../../assets/img/user.png";
import React from "react";
import {UserPageType} from "./UsersContainer";

type UsersPropsType = {
    usersPage: UserPageType
    pageSize: number
    totalCount: number
    currentPage: number
    onPageChanged: (page: number) => void
    follow: (id: number) => void
    unFollow: (id: number) => void
}

export const Users = (props: UsersPropsType) => {
    let pagesCount: number = Math.ceil(props.totalCount / props.pageSize)
    let pages: number[] = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    return (
        <div>
            <div>
                {pages.map((p, index) => {
                    return (
                        <span key={index}
                              className={props.currentPage === p ? s.selectedPage : ''}
                              onClick={() => {
                                  props.onPageChanged(p)
                              }}>
                                 {p}
                            </span>
                    )
                })}
            </div>
            {
                props.usersPage.users.map(u =>
                    <div key={u.id}>
                        <div>
                            <div>
                                <img className={s.photo} src={u.photos.small != null ? u.photos.small : userPhoto}
                                     alt={''}/>
                            </div>
                            <div>
                                {u.followed
                                    ? <button onClick={() => {
                                        props.unFollow(u.id)
                                    }}>UNFOLLOW</button>
                                    : <button onClick={() => {
                                        props.follow(u.id)
                                    }}>FOLLOW</button>
                                }
                            </div>
                        </div>
                        <div>
                            <div>
                                <div>{u.name}</div>
                                <div>{u.status}</div>
                            </div>
                            <div>
                                <div>{'u.location.country'}</div>
                                <div>{'u.location.city'}</div>
                            </div>
                        </div>
                    </div>)
            }
        </div>
    )
}