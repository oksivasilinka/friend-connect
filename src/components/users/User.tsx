import userPhoto from '../../assets/img/user.png'
import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { UserResponseType } from 'api/usersApi'
import { useDispatch, useSelector } from 'react-redux'
import { follow, unFollow } from 'redux/usersReducer'
import { getFollowingInProgress } from 'components/users/usersSelectors'
import { Button, Card,  Image, Typography } from 'antd'

type UserPropsType = {
    user: UserResponseType
}
const { Title, Text } = Typography
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

            <Card hoverable style={{ width: 400}}>

                    <NavLink to={'/profile/' + user.id}>
                        <Image
                            width={'150px'}
                            src={user.photos.small != null ? user.photos.small : userPhoto}
                            alt={'avatar'} preview={false}
                            style={{ borderRadius: '100%', marginBottom: '10px' }} />
                    </NavLink>
                    <div>
                        <Title level={3}>{user.name}</Title>
                        <Title level={5}>{user.status}</Title>
                    </div>

                    <div>
                        <Text strong>{'u.location.country'}</Text>
                    </div>
                    <div>
                        <Text strong>{'u.location.city'}</Text>
                    </div>

                    <div>
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

            </Card>


    )
}