import { Link } from 'react-router-dom'
import { Icon } from 'components/common/icon'
import s from './Nav.module.css'
import { Typography } from 'components/common'

const menuItems = [
    { id: 'profile', title: 'Profile' },
    { id: 'users', title: 'Users' },
    { id: 'chat', title: 'Chat' }
]

export const Nav = () => {

    return (
        <>
            {menuItems.map(item => (
                <Link key={item.id} className={s.link} to={`/${item.id}`}>
                    <Icon id={item.id} />
                    <Typography variant={'subtitle3'}>{item.title}</Typography>
                </Link>
            ))}
        </>
    )
}
