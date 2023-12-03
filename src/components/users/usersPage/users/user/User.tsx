import userPhoto from 'assets/img/user.png'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { UserResponseType } from 'api/usersApi'
import { useSelector } from 'react-redux'
import { follow, unFollow } from 'redux/usersReducer'
import { getFollowingInProgress } from 'components/users/usersSelectors'
import { Button, Typography } from 'antd'
import { useAppDispatch } from 'redux/store'
import s from './user.module.css'

type Props = {
    user: UserResponseType
}
const { Text } = Typography
export const User = ({ user }: Props) => {

    const followingInProgress = useSelector(getFollowingInProgress)
    const dispatch = useAppDispatch()

    const followHandler = (id: number) => {
        dispatch(follow(id))
    }

    const unfollowHandler = (id: number) => {
        dispatch(unFollow(id))
    }

    return (
        <div className={s.card}>
            <NavLink to={'/profile/' + user.id}>
                <img
                    src={user.photos.small != null ? user.photos.small : userPhoto}
                    alt={'avatar'} className={s.img} />
                <span className={s.name}>{user.name}</span>
            </NavLink>

            <span className={s.status}>{user.status}</span>


            <Text className={s.country} strong>{'u.location.country'}</Text>

            <Text className={s.city} strong>{'u.location.city'}</Text>


            <div className={s.button}>
                {user.followed
                    ? <Button type='dashed'
                              disabled={followingInProgress.some(id => id === user.id)}
                              onClick={() => followHandler(user.id)}>
                        UNFOLLOW
                    </Button>

                    : <Button type='primary'
                              disabled={followingInProgress.some(id => id === user.id)}
                              onClick={() => unfollowHandler(user.id)}>
                        FOLLOW
                    </Button>
                }
            </div>
        </div>


    )
}