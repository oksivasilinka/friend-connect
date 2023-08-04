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
}

export class Users extends React.Component<UsersPropsType, UsersType> {
    constructor(props: UsersPropsType) {
        super(props);
        axios.get('https://social-network.samuraijs.com/api/1.0/users')
            .then(res => {
                this.props.setUsers(res.data.items)
            })
    }

    render() {
        return (
            <div>
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
