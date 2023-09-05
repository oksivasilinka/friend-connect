import s from "./Users.module.css";
import userPhoto from "../../assets/img/user.png";
import React from "react";
import {NavLink} from "react-router-dom";
import {UsersType} from "../../redux/usersReducer";

type UserPropsType = {
    user: UsersType
    follow: (id: number) => void
    unFollow: (id: number) => void
    followingInProgress: number[]
}

export const User: React.FC<UserPropsType> = ({user, follow, unFollow, followingInProgress}) => {
    return (
        <div>
            <div>
                <div>
                    <NavLink to={'/profile/' + user.id}>
                        <img className={s.photo}
                             src={user.photos.small != null ? user.photos.small : userPhoto}
                             alt={'avatar'}/>
                    </NavLink>
                </div>
                <div>
                    {user.followed
                        ? <button
                            disabled={followingInProgress.some(id => id === user.id)}
                            onClick={() => {
                                follow(user.id)
                            }}> UNFOLLOW </button>

                        : <button
                            disabled={followingInProgress.some(id => id === user.id)}
                            onClick={() => {
                                unFollow(user.id)
                            }}> FOLLOW </button>
                    }
                </div>
            </div>
            <div>
                <div>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                </div>
                <div>
                    <div>{'u.location.country'}</div>
                    <div>{'u.location.city'}</div>
                </div>
            </div>
        </div>
    )
}