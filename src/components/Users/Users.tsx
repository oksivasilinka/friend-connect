import React from "react";
import {UsersType} from "../../redux/usersReducer";
import s from './Users.module.css'
import {UserPageType} from "./UsersContainer";

type UsersPropsType = {
    usersPage: UserPageType
    follow: (id: number) => void,
    unFollow: (id: number) => void,
    setUsers: (users: UsersType[]) => void
}

export const Users = (props: UsersPropsType) => {
    if (props.usersPage.users.length === 0) {
        props.setUsers([
            {
                id: 1,
                photoUrl: 'https://oir.mobi/uploads/posts/2021-04/1619619348_59-oir_mobi-p-samie-milie-kotiki-zhivotnie-krasivo-foto-65.jpg',
                followed: true,
                fullName: 'Dmitry',
                status: 'i am a boss',
                location: {
                    city: 'Minsk', country: 'Belarus'
                }
            },
            {
                id: 2,
                photoUrl: 'https://oir.mobi/uploads/posts/2021-04/1619619348_59-oir_mobi-p-samie-milie-kotiki-zhivotnie-krasivo-foto-65.jpg',
                followed: true,
                fullName: 'Vova',
                status: 'i am a boss',
                location: {
                    city: 'Minsk', country: 'Belarus'
                }
            },
            {
                id: 3,
                photoUrl: 'https://oir.mobi/uploads/posts/2021-04/1619619348_59-oir_mobi-p-samie-milie-kotiki-zhivotnie-krasivo-foto-65.jpg',
                followed: true,
                fullName: 'Valera',
                status: 'i am a cat',
                location: {
                    city: 'Minsk', country: 'Belarus'
                }
            },
            {
                id: 4,
                photoUrl: 'https://oir.mobi/uploads/posts/2021-04/1619619348_59-oir_mobi-p-samie-milie-kotiki-zhivotnie-krasivo-foto-65.jpg',
                followed: false,
                fullName: 'Oksana',
                status: 'i am a boss',
                location: {
                    city: 'Minsk', country: 'Belarus'
                }
            },
            {
                id: 5,
                photoUrl: 'https://oir.mobi/uploads/posts/2021-04/1619619348_59-oir_mobi-p-samie-milie-kotiki-zhivotnie-krasivo-foto-65.jpg',
                followed: false,
                fullName: 'Dory',
                status: 'i am a dog',
                location: {
                    city: 'Novopolotsk', country: 'Belarus'
                }
            },
        ] )
    }

    return (
        <div>
            {
                props.usersPage.users.map(u =>
                    <div key={u.id}>
                        <span>
                            <div>
                                <img className={s.photo} src={u.photoUrl} alt={''}/>
                            </div>
                            <div>
                                {u.followed
                                    ? <button onClick={() => {props.unFollow(u.id)}}>UNFOLLOW</button>
                                    : <button onClick={() => {props.follow(u.id)}}>FOLLOW</button>
                                }
                            </div>
                        </span>

                        <span>
                            <span>
                                <div>{u.fullName}</div>
                                <div>{u.status}</div>
                            </span>

                            <span>
                                    <div>{u.location.country}</div>
                                    <div>{u.location.city}</div>
                            </span>

                        </span>
                    </div>)
            }
        </div>
    )
}