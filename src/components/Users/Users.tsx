import React from "react";
import {UsersType} from "../../redux/usersReducer";
import s from './Users.module.css'
import {UserPageType} from "./UsersContainer";
import axios from "axios";
import userPhoto from './../../assets/img/user.png'

type UsersPropsType = {
    usersPage: UserPageType
    follow: (id: number) => void,
    unFollow: (id: number) => void,
    setUsers: (users: UsersType[]) => void
    pageSize: number
    totalUsersCount: number
    currentPage: number
    setCurrentPage: (pageNumber: number) => void
    setTotalUsersCount: (totalCount: number) => void

}

export class Users extends React.Component<UsersPropsType, UsersType> {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(res => {
                this.props.setUsers(res.data.items)
                this.props.setTotalUsersCount(res.data.totalUsersCount)
            })
    }
    onPageChanged = (page: number) => {
        this.props.setCurrentPage(page)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${this.props.pageSize}`)
            .then(res => {
                this.props.setUsers(res.data.items)
            })
    }

    render() {
        let pagesCount: number = Math.ceil(this.props.totalUsersCount / this.props.pageSize)
        let pages: number[] = []
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }
        return (
            <div>
                <div>
                    {pages.map(p => {
                        return (
                            <span
                                className={this.props.currentPage === p ? s.selectedPage : ''}
                                onClick={()=>{this.onPageChanged(p)}}>
                                {p}
                            </span>
                        )
                    })}
                </div>
                {
                    this.props.usersPage.users.map(u =>
                        <div key={u.id}>
                            <div>
                                <div>
                                    <img className={s.photo} src={u.photos.small != null ? u.photos.small : userPhoto}
                                         alt={''}/>
                                </div>
                                <div>
                                    {u.followed
                                        ? <button onClick={() => {
                                            this.props.unFollow(u.id)
                                        }}>UNFOLLOW</button>
                                        : <button onClick={() => {
                                            this.props.follow(u.id)
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
}
