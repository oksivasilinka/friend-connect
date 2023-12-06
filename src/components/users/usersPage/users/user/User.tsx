import userPhoto from 'assets/img/user.png'
import { NavLink } from 'react-router-dom'
import { UserResponseType } from 'api/usersApi'
import { useSelector } from 'react-redux'
import { follow, unFollow } from 'redux/usersReducer'
import { getFollowingInProgress } from 'components/users/model/usersSelectors'
import { useAppDispatch } from 'redux/store'
import { Button, Typography } from 'components/common'
import s from './user.module.css'

type Props = {
    user: UserResponseType
}

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
            <NavLink to={'/profile/' + user.id} className={s.link}>
                <img
                    src={user.photos.small != null ? user.photos.small : userPhoto}
                    alt={'avatar'} className={s.img} />
                <Typography variant={'subtitle1'} className={s.text}>{user.name}</Typography>
            </NavLink>

            <Typography variant={'caption1'} className={s.text}>{user.status}</Typography>

            {user.followed && (
                <Button
                    disabled={followingInProgress.some(id => id === user.id)}
                    callback={() => followHandler(user.id)}>
                    <Typography variant={'body1'}>UNFOLLOW</Typography>
                </Button>
            )}

            {!user.followed && (
                <Button className={s.buttonFollow}
                        disabled={followingInProgress.some(id => id === user.id)}
                        callback={() => unfollowHandler(user.id)}>
                    <Typography className={s.textButton} variant={'body1'}>FOLLOW</Typography>
                </Button>
            )}
        </div>
    )
}