import s from './Users.module.css'
import userPhoto from '../../assets/img/user.png'
import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { UserResponseType } from 'api/usersApi'
import { useDispatch, useSelector } from 'react-redux'
import { follow, unFollow } from 'redux/usersReducer'
import { getFollowingInProgress } from 'components/users/usersSelectors'

type UserPropsType = {
    user: UserResponseType
}

export const User: FC<UserPropsType> = ({ user }) => {

    const followingInProgress = useSelector(getFollowingInProgress)
    const dispatch = useDispatch()

    const followHandler = (id: number) => {
        dispatch(follow(id))
    }

    const unfollowHandler = (id: number) => {
        dispatch(unFollow(id))
    }

    return (
        <div>
            <div>
                <NavLink to={'/profile/' + user.id}>
                    <img className={s.photo}
                         src={user.photos.small != null ? user.photos.small : userPhoto}
                         alt={'avatar'} />
                </NavLink>
                <div>
                    {user.followed
                        ? <button
                            disabled={followingInProgress.some(id => id === user.id)}
                            onClick={() => followHandler(user.id)}>
                            UNFOLLOW
                        </button>

                        : <button
                            disabled={followingInProgress.some(id => id === user.id)}
                            onClick={() => unfollowHandler(user.id)}>
                            FOLLOW
                        </button>
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