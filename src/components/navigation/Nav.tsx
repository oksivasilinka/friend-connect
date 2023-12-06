import { Icon } from 'components/common/icon'
import s from './Nav.module.css'
import { Typography } from 'components/common'
import { NavLink } from 'react-router-dom'

const menuItems = [
    { id: 'profile', title: 'Profile' },
    { id: 'users', title: 'Users' },
    { id: 'chat', title: 'Chat' }
]

export const Nav = () => {

    return (
        <>
            {menuItems.map(item => (
                <NavLink key={item.id} to={`/${item.id}`}
                         className={({isActive}) =>`${isActive ? `${s.link} ${s.active}` : s.link}`}>
                    <Icon id={item.id} />
                    <Typography className={s.linkText} variant={'subtitle3'} as={'a'}>{item.title}</Typography>
                </NavLink>
            ))}
        </>
    )
}
